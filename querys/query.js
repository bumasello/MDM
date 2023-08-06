const q_populaBrzCorCursorDtl = `
BEGIN
popula_brz_vermelho_dtl;
popula_brz_azul_dtl;
popula_brz_preto_dtl;
popula_brz_rosa_dtl;
END;
`;

const q_updateBrzCorCursorDtl = `
BEGIN
update_brz_azul_dtl;
update_brz_preto_dtl;
update_brz_rosa_dtl;
update_brz_vermelho_dtl;
END;
`;

const q_populaPrtCor = `
BEGIN
popula_prt_cod_pk;
popula_prt_pes_doc_pad;
popula_prt_pes;
popula_prt_pes_ctt_elet;
popula_prt_pes_end;
popula_prt_pes_tel;
END;
`;

const q_updatePrtCor = `
BEGIN
update_prt_cod_pk;
update_prt_pes_doc_pad;
update_prt_pes;
update_prt_pes_ctt_elet;
update_prt_pes_end;
update_prt_pes_tel;
END;
`;

const q_geraInvalidoCor = `
BEGIN
popula_cura_inv;
processar_motiv_inv_cnv;
processar_motiv_inv_qci;
processar_motiv_inv_qni;
processar_motiv_inv_ndb;
processar_motiv_inv_dci;
END;
`;

const q_log_controle_inicio = (msg) => {
  let query = `BEGIN
log_controle_mdm_inicio('${msg}');
END;`;
  return query;
};

const q_log_controle_fim = (msg) => {
  let query = `BEGIN
log_controle_mdm_fim('${msg}');
END;
`;
  return query;
};

export default {
  q_populaBrzCorCursorDtl,
  q_updateBrzCorCursorDtl,
  q_populaPrtCor,
  q_updatePrtCor,
  q_geraInvalidoCor,
  q_log_controle_inicio,
  q_log_controle_fim,
};
