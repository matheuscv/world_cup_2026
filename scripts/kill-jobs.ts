/**
 * Marca todos os agentes running/pending em agent_runs como 'failed',
 * evitando registros órfãos no banco.
 *
 * Uso:
 *   npm run kill-jobs                        # encerra todos running/pending
 *   npm run kill-jobs -- --type scout        # encerra apenas agent_type=scout
 *   npm run kill-jobs -- --id <uuid>         # encerra run específica
 */

import pg from 'pg';

// ─── DB ───────────────────────────────────────────────────────────────────────

const pgClient = new pg.Client({ connectionString: process.env.DATABASE_URL });

// ─── Types ────────────────────────────────────────────────────────────────────

interface AgentRunRow {
  id: string;
  agent_type: string;
  status: string;
  created_at: Date;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function listActive(agentType?: string): Promise<AgentRunRow[]> {
  const { rows } = await pgClient.query<AgentRunRow>(
    `SELECT id, agent_type, status, created_at
     FROM agent_runs
     WHERE status IN ('running', 'pending')
       AND ($1::TEXT IS NULL OR agent_type::TEXT = $1)
     ORDER BY created_at DESC`,
    [agentType ?? null],
  );
  return rows;
}

async function markFailed(ids: string[]): Promise<number> {
  const { rowCount } = await pgClient.query(
    `UPDATE agent_runs
     SET status        = 'failed',
         error_message = 'Run encerrada manualmente via kill-jobs',
         completed_at  = NOW()
     WHERE id = ANY($1::uuid[])`,
    [ids],
  );
  return rowCount ?? 0;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  const typeIdx = args.indexOf('--type');
  const idIdx   = args.indexOf('--id');

  const filterType = typeIdx !== -1 ? args[typeIdx + 1] : undefined;
  const specificId = idIdx   !== -1 ? args[idIdx + 1]   : undefined;

  console.log('\n🗑️  kill-jobs — agentic-squad-world_cup_2026-db');
  console.log('══════════════════════════════════════════════════════');

  await pgClient.connect();

  // ── Modo: id específico ────────────────────────────────────────────────────

  if (specificId) {
    console.log(`\n🔍 Encerrando run id=${specificId}...`);
    const count = await markFailed([specificId]);
    if (count === 0) {
      console.log('   ⚠️  Nenhuma run encontrada com esse id (ou já finalizada).');
    } else {
      console.log('   ✅ Run marcada como failed.');
    }
    await pgClient.end();
    console.log('\n✅ Concluído.\n');
    return;
  }

  // ── Lista ativos ───────────────────────────────────────────────────────────

  const active = await listActive(filterType);

  if (active.length === 0) {
    const scope = filterType ? ` do tipo "${filterType}"` : '';
    console.log(`\n  ✅  Nenhum agente running/pending${scope} — nada a encerrar.\n`);
    await pgClient.end();
    return;
  }

  const scope = filterType ? ` (agent_type=${filterType})` : '';
  console.log(`\n🔍 Agentes running/pending${scope} (${active.length}):`);
  console.log(`  ${'─'.repeat(60)}`);

  for (const row of active) {
    console.log(
      `  [${row.status.toUpperCase().padEnd(7)}]  type=${row.agent_type.padEnd(12)}  id=${row.id}`,
    );
  }

  console.log(`  ${'─'.repeat(60)}`);
  console.log(`\n⚡ Marcando ${active.length} run(s) como failed...`);

  const count = await markFailed(active.map((r) => r.id));
  console.log(`   ✅ ${count} run(s) encerrada(s).`);

  console.log('\n✅ Concluído.\n');
  await pgClient.end();
}

main().catch((err: Error) => {
  console.error('Erro:', err.message);
  process.exit(1);
});
