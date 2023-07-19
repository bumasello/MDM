# API - Paciente

Esta aplicação consiste em uma API responsável por buscar dados de múltiplos bancos de dados armazenados e realizar o processo de enriquecimento e curadoria dessas informações. A API é executada automaticamente a cada 24 horas, sempre á meia noite, para atualizar os dados de forma programada

## Funcionamento

1. Etapa 1 - **recupDataPac**

A aplicação inicia a busca dos dados de todas as bases com a função **recupDataPac**, armazenando os dados recuperados em uma tabela denominada STG (Staging). Essa tabela é responsável por receber os dados brutos, sem qualquer enriquecimento ou modificação.

---

2. Etapa 2 - **populaBipPac**

Nesta etapa, os dados coletados na tabela STG serão armazenados no schema BIP, que possui diferentes tabelas para separar e organizar os dados de forma adequada. Cada registro será associado a um ID_BIP_PES, que será utilizado para agregar todas as IDs BIPs menores.

O schema BIP é composto pelas seguintes tabelas:

- **Tabela BIP_PES:**

Esta tabela armazena os dados principais da pessoa física. Ela contém informações como NM_PES (nome da pessoa).
Cada registro na tabela BIP_PES é associado a um ID_BIP_PES específico.

- **Tabela BIP_PES_CTT_ELET:**

Esta tabela armazena os dados de contato eletrônico da pessoa física.
Cada registro na tabela BIP_PES_CTT_ELET está associado a um ID_BIP_PES correspondente na tabela BIP_PES.

- **Tabela BIP_PES_END:**

Esta tabela armazena os dados de endereço da pessoa física.
Cada registro na tabela BIP_PES_END está associado a um ID_BIP_PES correspondente na tabela BIP_PES.

- **Tabela BIP_PES_INFO_BCO:**

Esta tabela armazena os dados de informação bancária da pessoa física.
Cada registro na tabela BIP_PES_INFO_BCO está associado a um ID_BIP_PES correspondente na tabela BIP_PES.

- **Tabela BIP_PES_TEL:**

Esta tabela armazena os dados de telefone da pessoa física.
Cada registro na tabela BIP_PES_TEL está associado a um ID_BIP_PES correspondente na tabela BIP_PES.

- **Tabela BIP_PES_DOC_PAD:**

Esta tabela armazena os dados de documento da pessoa física, como CPF ou CRM no caso de profissionais de saúde.
Cada registro na tabela BIP_PES_DOC_PAD está associado a um ID_BIP_PES correspondente na tabela BIP_PES.

Essa divisão em diferentes tabelas dentro do schema BIP permite armazenar os dados separadamente, evitando a mistura de informações. Cada tabela é responsável por armazenar um tipo específico de dado relacionado à pessoa física, e todos os registros são vinculados por meio do ID_BIP_PES.

Dessa forma, a etapa 2 do processo de enriquecimento e curadoria consiste em populaBip, onde os dados coletados na tabela STG são inseridos nas tabelas correspondentes do schema BIP, permitindo a organização e associação adequada dos dados.

---

3. Etapa 3 - **geraInvalidoPac**

A função **geraInvalidoPac** é acionada para verificar as inconsistências nos dados da tabela BIP. Nesta etapa, além de verificar as inconsistências e manipular a flag Status na tabela BIP, a função também realiza o armazenamento dos registros que foram invalidados no schema Invalidos.

O Schema Invalidos contém tabelas que serão populadas com as informações dos registros invalidados. A tabela INV_BIP_PES é uma delas, e contém as seguintes informações para cada registro inválido de pessoa física:

- **Tabela INV_BIP_PES:**
  Esta tabela armazena a ID_BIP_PES da pessoa física inválida, a data em que foi invalidada e o motivo da invalidação.
  Cada registro na tabela INV_BIP_PES representa uma pessoa física invalidada e está associado ao código do motivo de invalidação e à data de invalidação.

As verificações a seguir são relacionadas a parte de **NOME** e **CPF** de **PESSOA FISICA**:

- _Verificação 1_: O nome retornado pelo CPF do paciente (por meio dos bancos de dados incrementados pela API-SERASA) coincide exatamente com o nome registrado na coluna "Nome" da tabela STG. **Motivo Inválido: Nome diferente do Banco de Dados**
- _Verificação 2:_ O CPF contém uma quantidade diferente de 11 caracteres, ou não consiste em 11 caracteres numéricos, ou possui 14 caracteres contando "." e "-". **Motivo Inválido: CPF com quantidade diferente de 11 caracteres**
- _Verificação 3:_ O CPF registrado no registro da STG não possui nenhum retorno nos bancos de dados incrementados pela API-SERASA. **Motivo Inválido: CPF não encontrado no Banco de Dados**
- _Verificação 4:_ A coluna "CPF" da tabela STG está vazia. **Motivo Inválido: Campo nulo ou vazio**
- _Verificação 5:_ O nome, ou qualquer campo que tenha a obrigatoriedade de ter mais de 3 caracteres preenchidos, não está devidamente preenchido na tabela STG. **Motivo Inválido: Descrição com menos de 3 caracteres**

Conforme as regras são aplicadas, os registros que não atendem às verificações são adicionados à tabela de inválidos, denominada "Invalidos". Esses registros terão a flag Status atualizada para "I", indicando que são inválidos. Cada registro inválido receberá uma Primary Key de inválido associada ao seu código BIP.

Por outro lado, os registros que passarem por todas as verificações receberão a flag Status atualizada para "U", indicando que são válidos.

Além disso, a tabela "Invalidos" possui colunas que registram quando um registro se tornou inválido e quando deixou de ser inválido, permitindo rastrear as mudanças de status ao longo do tempo.

---

4. Etapa 4 - **geraBupPac**

Nesta etapa, os registros que foram validados com sucesso passam por um processo adicional. Cada registro válido na tabela BIP receberá uma chave chamada BUP, que está associada a um CPF específico. É importante ressaltar que uma vez que uma BUP é associada a um CPF, essa associação não pode ser desfeita.
Dessa forma, todos os registros da tabela BIP que possuem o mesmo CPF serão adicionados à mesma BUP. A tabela BUP armazena esses registros válidos juntamente com suas respectivas BIPs e CPFs.

---

5. Etapa 5 - **reproStatusPac**

Etapa 1:

A função reproStatus é acionada e lê todos os registros marcados para reprocessamento dentro da tabela de Reprocessamento, considerando apenas os registros relacionados ao domínio de pacientes.

Cada registro lido passa pelas mesmas verificações da função geraInvalidos. Caso o registro passe em todas as verificações, é feita uma verificação adicional para verificar se já existe uma BUP (chave) relacionada ao CPF dessa BIP. Se houver uma BUP existente para o CPF, a BIP é associada a essa BUP. Caso não haja nenhuma BUP associada ao CPF, é gerada uma nova BUP para essa BIP, fazendo a associação entre a BUP e o CPF.

Etapa 2:
A função reproStatus verifica todas as BIPs que ainda estão marcadas com o status "i" (inválido), dentro de um intervalo de processamento que compreende o período de ontem até 5 dias atrás. O objetivo é verificar se a curadoria já foi realizada para essas BIPs.

Verificação de Curadoria:
Para cada BIP com status "i" que está dentro do período de verificação, a função realiza as mesmas verificações aplicadas pela função geraInvalidos. Essas verificações correspondem às regras de validação mencionadas anteriormente.

Caso a BIP passe em todas as verificações e não seja considerada inválida, sua flag é atualizada para "U" (válido).

Se a BIP não passar em alguma das verificações e continuar sendo considerada inválida, sua flag permanece como "I" (inválido).

Associação da BIP com BUP:
Após a verificação de curadoria, é verificado se houve uma mudança de status para a BIP, ou seja, se o status anterior era "I" (inválido) e passou para "U" (válido).

Se o status da BIP foi atualizado de "I" para "U", é verificado se já existe uma BUP associada ao CPF do registro. Se houver uma BUP existente para o CPF, a BIP é associada a essa BUP.

Se não houver nenhuma BUP realizada para o CPF do registro, é gerada uma nova BUP e a associação entre a BIP e a BUP é feita.

É importante ressaltar que a associação da BIP com a BUP é realizada somente quando o status da BIP muda de "I" para "U". Essa associação ocorre apenas para os registros que passaram por todas as verificações e foram considerados válidos após a verificação de curadoria.
