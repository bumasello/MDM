const q_populaBrzCorCursorDtl = `
BEGIN
populabrzcorcursorvermelhodtl;
populabrzcorcursorazuldtl;
populabrzcorcursorpretodtl;
populabrzcorcursorrosadtl;
END;
`;

const q_populaPrtCor = `
BEGIN
popula_prt_pes_doc_pad();
popula_prt_pes();
popula_prt_pes_ctt_elet();
popula_prt_pes_end();
popula_prt_pes_tel();
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
  q_populaPrtCor,
  q_log_controle_inicio,
  q_log_controle_fim,
};
