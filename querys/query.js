const q_recupDataPacCursorDtl = `
BEGIN
recupDataPacCursorBanguDtl();
recupDataPacCursorCaxiasDtl();
recupDataPacCursorNiteroiDtl();
recupDataPacCursorGloriaDtl();
END;
`;

const q_populaBipPac = `
BEGIN
popula_bip_pes_doc_pad();
popula_bip_pes();
popula_bip_pes_ctt_elet();
popula_bip_pes_end();
popula_bip_pes_tel();
END;
`;

const q_log_controle_inicio_Rdp = `BEGIN
log_controle_mdm_inicio('recupDataPac');
END;
`;
const q_log_controle_inicio_Pbp = `BEGIN
log_controle_mdm_inicio('populaBipPac');
END;
`;
const q_log_controle_fim_Rdp = `BEGIN
log_controle_mdm_fim('recupDataPac');
END;
`;

const q_log_controle_fim_Pbp = `BEGIN
log_controle_mdm_fim('populaBipPac');
END;
`;

export default {
  q_recupDataPacCursorDtl,
  q_populaBipPac,
  q_log_controle_inicio_Rdp,
  q_log_controle_fim_Rdp,
  q_log_controle_inicio_Pbp,
  q_log_controle_fim_Pbp,
};
