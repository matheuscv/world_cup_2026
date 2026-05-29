/**
 * Lista todos os agentes em execução (e pendentes) na tabela
 * copa2026.agent_runs do projeto agentic-squad-world_cup_2026-db.
 *
 * Uso:
 *   npm run list-jobs
 */

import pg from 'pg';

// ─── DB ───────────────────────────────────────────────────────────────────────

const pgClient = new pg.Client({ connectionString: process.env.DATABASE_URL });

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_ICON: Record<string, string> = {
  running: '🟢',
  pending: '🟡',
  failed:  '🔴',
  completed: '✅',
};

function elapsed(ms: number): string {
  const s = Math.floor(Math.abs(ms) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ${s % 60}s`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentRunRow {
  id: string;
  agent_type: string;
  status: string;
  iteration: number;
  input_tokens: number | null;
  output_tokens: number | null;
  cost_usd: number | null;
  error_message: string | null;
  started_at: Date | null;
  created_at: Date;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await pgClient.connect();

  const now = Date.now();

  console.log('\n══════════════════════════════════════════════════════');
  console.log('  📋  Agentes ativos — ' + new Date().toLocaleTimeString('pt-BR'));
  console.log('  📦  Projeto: agentic-squad-world_cup_2026-db');
  console.log('══════════════════════════════════════════════════════');

  const { rows } = await pgClient.query<AgentRunRow>(`
    SELECT
      id,
      agent_type,
      status,
      iteration,
      input_tokens,
      output_tokens,
      cost_usd,
      error_message,
      started_at,
      created_at
    FROM agent_runs
    WHERE status IN ('running', 'pending')
    ORDER BY created_at DESC
  `);

  if (rows.length === 0) {
    console.log('\n  ✅  Nenhum agente ativo no momento.\n');
  } else {
    console.log(`\n  ┌─ Agentes ativos (${rows.length})`);

    for (const row of rows) {
      const icon = STATUS_ICON[row.status] ?? '⬜';
      const age  = row.started_at
        ? elapsed(now - row.started_at.getTime())
        : row.created_at
          ? elapsed(now - row.created_at.getTime())
          : '—';
      const tokens = row.input_tokens !== null
        ? `in=${row.input_tokens} out=${row.output_tokens ?? 0}`
        : '—';
      const cost = row.cost_usd !== null
        ? `$${row.cost_usd.toFixed(4)}`
        : '—';

      console.log(`  │`);
      console.log(`  │  ${icon} ${row.status.toUpperCase()}`);
      console.log(`  │     id          : ${row.id}`);
      console.log(`  │     agent_type  : ${row.agent_type}`);
      console.log(`  │     iteração    : ${row.iteration}`);
      console.log(`  │     tokens      : ${tokens}`);
      console.log(`  │     custo       : ${cost}`);
      console.log(`  │     há          : ${age}`);
      if (row.error_message) {
        console.log(`  │     erro        : ${row.error_message}`);
      }
    }

    console.log(`  └${'─'.repeat(50)}`);
    console.log(`\n  Total: ${rows.length} agente(s) em execução/pendentes.\n`);
  }

  // ── Totais gerais ──────────────────────────────────────────────────────────

  const { rows: summary } = await pgClient.query<{
    status: string;
    count: string;
    total_cost: string | null;
  }>(`
    SELECT
      status,
      COUNT(*)::TEXT AS count,
      SUM(cost_usd)::TEXT AS total_cost
    FROM agent_runs
    GROUP BY status
    ORDER BY status
  `);

  if (summary.length > 0) {
    console.log('  Histórico por status:');
    for (const row of summary) {
      const icon = STATUS_ICON[row.status] ?? '⬜';
      const cost = row.total_cost ? ` | custo total: $${parseFloat(row.total_cost).toFixed(4)}` : '';
      console.log(`    ${icon} ${row.status.padEnd(12)} ${row.count.padStart(4)} run(s)${cost}`);
    }
    console.log('');
  }

  await pgClient.end();
}

main().catch((err: Error) => {
  console.error('Erro:', err.message);
  process.exit(1);
});
