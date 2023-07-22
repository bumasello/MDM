const q_recupDataPacCursorDtl = `
BEGIN
recupDataPacCursorBanguDtl();
recupDataPacCursorCaxiasDtl();
recupDataPacCursorNiteroiDtl();
recupDataPacCursorGloriaDtl();
END;
`;

const q_log_controle_inicio = `BEGIN
log_controle_mdm_inicio('recupDataPac');
END;
`;

const q_log_controle_fim = `BEGIN
log_controle_mdm_fim('recupDataPac');
END;
`;

export default {
  q_recupDataPacCursorDtl,
  q_log_controle_inicio,
  q_log_controle_fim,
};
