API - Paciente
Esta aplicação consiste em uma API responsável por buscar dados de múltiplos bancos de dados armazenados e realizar o processo de enriquecimento e curadoria dessas informações. A API é executada automaticamente a cada 24 horas, sempre á meia noite, para atualizar os dados de forma programada

Funcionamento
Etapa 1 - recupData
A aplicação inicia a busca dos dados de todas as bases com a função recupData, armazenando os dados recuperados em uma tabela denominada STG (Staging). Essa tabela é responsável por receber os dados brutos, sem qualquer enriquecimento ou modificação.

Etapa 2 - populaBip
Em seguida, os dados da tabela STG são processados e adicionados à tabela BIP por meio da função populaBip. Cada registro da STG recebe um código BIP, representando o enriquecimento realizado. A tabela BIP contém os dados enriquecidos, incluindo as associações e Primary Keys.

Etapa 3 - geraInvalido
A função geraInvalido é acionada para verificar as inconsistências nos dados da tabela BIP. As seguintes verificações são realizadas:

Verificação 1: O nome retornado pelo CPF do paciente (por meio dos bancos de dados incrementados pela API-SERASA) coincide exatamente com o nome registrado na coluna "Nome" da tabela STG. Motivo Inválido: Nome diferente do Banco de Dados
Verificação 2: O CPF contém uma quantidade diferente de 11 caracteres, ou não consiste em 11 caracteres numéricos, ou possui 14 caracteres contando "." e "-". Motivo Inválido: CPF com quantidade diferente de 11 caracteres
Verificação 3: O CPF registrado no registro da STG não possui nenhum retorno nos bancos de dados incrementados pela API-SERASA. Motivo Inválido: CPF não encontrado no Banco de Dados
Verificação 4: A coluna "CPF" da tabela STG está vazia. Motivo Inválido: Campo nulo ou vazio
Verificação 5: O nome, ou qualquer campo que tenha a obrigatoriedade de ter mais de 3 caracteres preenchidos, não está devidamente preenchido na tabela STG. Motivo Inválido: Descrição com menos de 3 caracteres
Conforme as regras são aplicadas, os registros que não atendem às verificações são adicionados à tabela de inválidos, denominada "Invalidos". Esses registros terão a flag Status atualizada para "I", indicando que são inválidos. Cada registro inválido receberá uma Primary Key de inválido associada ao seu código BIP.

Por outro lado, os registros que passarem por todas as verificações receberão a flag Status atualizada para "U", indicando que são válidos.

Além disso, a tabela "Invalidos" possui colunas que registram quando um registro se tornou inválido e quando deixou de ser inválido, permitindo rastrear as mudanças de status ao longo do tempo.

Etapa 4 - geraBup
Nesta etapa, os registros que foram validados com sucesso passam por um processo adicional. Cada registro válido na tabela BIP receberá uma chave chamada BUP, que está associada a um CPF específico. É importante ressaltar que uma vez que uma BUP é associada a um CPF, essa associação não pode ser desfeita. Dessa forma, todos os registros da tabela BIP que possuem o mesmo CPF serão adicionados à mesma BUP. A tabela BUP armazena esses registros válidos juntamente com suas respectivas BIPs e CPFs.

Etapa 5 - reproStatus
Etapa 1:

A função reproStatus é acionada e lê todos os registros marcados para reprocessamento dentro da tabela de Reprocessamento, considerando apenas os registros relacionados ao domínio de pacientes.

Cada registro lido passa pelas mesmas verificações da função geraInvalidos. Caso o registro passe em todas as verificações, é feita uma verificação adicional para verificar se já existe uma BUP (chave) relacionada ao CPF dessa BIP. Se houver uma BUP existente para o CPF, a BIP é associada a essa BUP. Caso não haja nenhuma BUP associada ao CPF, é gerada uma nova BUP para essa BIP, fazendo a associação entre a BUP e o CPF.

Etapa 2: A função reproStatus verifica todas as BIPs que ainda estão marcadas com o status "i" (inválido), dentro de um intervalo de processamento que compreende o período de ontem até 5 dias atrás. O objetivo é verificar se a curadoria já foi realizada para essas BIPs.

Verificação de Curadoria: Para cada BIP com status "i" que está dentro do período de verificação, a função realiza as mesmas verificações aplicadas pela função geraInvalidos. Essas verificações correspondem às regras de validação mencionadas anteriormente.

Caso a BIP passe em todas as verificações e não seja considerada inválida, sua flag é atualizada para "U" (válido).

Se a BIP não passar em alguma das verificações e continuar sendo considerada inválida, sua flag permanece como "I" (inválido).

Associação da BIP com BUP: Após a verificação de curadoria, é verificado se houve uma mudança de status para a BIP, ou seja, se o status anterior era "I" (inválido) e passou para "U" (válido).

Se o status da BIP foi atualizado de "I" para "U", é verificado se já existe uma BUP associada ao CPF do registro. Se houver uma BUP existente para o CPF, a BIP é associada a essa BUP.

Se não houver nenhuma BUP realizada para o CPF do registro, é gerada uma nova BUP e a associação entre a BIP e a BUP é feita.

É importante ressaltar que a associação da BIP com a BUP é realizada somente quando o status da BIP muda de "I" para "U". Essa associação ocorre apenas para os registros que passaram por todas as verificações e foram considerados válidos após a verificação de curadoria.
