# mycompany

## Database

#### User
> ID
> NOME
> COGNOME
> EMAIL
> PASSWORD

### Aule

#### Aula

> ID
> CAPACITA'
> NOME
> LOCAZIONE

#### Accessori aula

> ID
> NOME

#### Associazione aula/accessori

> ID AULA*
> ID ACCESSORIO*
> QUANTITA'

#### Prenotazione aula

> ID
> DATA/ORA INIZIO
> DATA/ORA FINE
> ID UTENTE*
> ID AULA*

### Sondaggi

#### Sondaggio

> ID
> ID GESTORE
> NOME

#### Domanda

> ID
> ID SONDAGGIO
> DOMANDA
> RISPOSTA
> TYPE
> STEP
> CONDIZIONI

#### Condizioni domande

> ID DOMANDA PRECENDENTE
> ID DOMANDA
> RISPOSTA

#### Risposta

> ID DOMANDA
> RISPOSTA
> ID UTENTE

### Assenze

#### 

## API
    /users



<!--stackedit_data:
eyJoaXN0b3J5IjpbMTgyMDkzMzIyMCwtMTMyODUzMDI0Nyw2Nz
AxNDE5NTMsLTk5NTgyODU1NywtNTgzMDYyMjA4LC04NjY1ODQ3
NjcsOTYyMzkxODQzLDEzNzMyODc3MjksMTEzNTcwNzgyNywtMT
YyOTg1MDU2Nyw4MDY4NTMxNzRdfQ==
-->