# 📘 Documentação do Projeto – Gestão de Veículos (Frontend)

## 📖 Descrição
Este projeto para **gestão de veículos**.  
Permite **cadastrar, listar, filtrar, visualizar detalhes, editar e excluir veículos**, consumindo uma **API REST** (mockada com `json-server` ou integrada com um backend real).  

---

## 🛠️ Tecnologias Utilizadas
- **React + Vite** → Frontend rápido e modular  
- **Axios** → Consumo de API  
- **TailwindCSS** → Estilização responsiva  
- **json-server** → API mock local  
- **Node.js 18+** → Ambiente recomendado  

---

## 📂 Estrutura de Pastas
```
├── public/               # arquivos estáticos
├── src/
│   ├── api/
│   │   └── vehicleService.js   # funções de consumo da API
│   ├── components/
│   │   ├── VehicleForm.jsx     # formulário de cadastro/edição
│   │   ├── VehicleList.jsx     # lista com ações
│   │   └── VehicleDetails.jsx  # modal com detalhes
│   ├── pages/
│   │   └── Home.jsx            # tela principal (CRUD + filtros)
│   └── main.jsx                # entrada React
├── db.json               # banco de dados mock (json-server)
├── package.json
└── README.md
```

---

## 🚀 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/supiacenti/sub_fase3.git
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Rodar API mock (json-server)
```bash
npm run api
```
- Endpoint: [http://localhost:3000/vehicles](http://localhost:3000/vehicles)

### 4. Rodar frontend
```bash
npm run dev
```
- Acesse: [http://localhost:5173](http://localhost:5173)

---

## 📋 Funcionalidades
✅ **Cadastro de veículos** (placa, marca, modelo, ano, cor)  
✅ **Listagem de veículos cadastrados**  
✅ **Filtros de busca** (marca, ano)  
✅ **Visualização detalhada em modal**  
✅ **Edição de veículo existente**  
✅ **Exclusão com confirmação**  
✅ **Interface responsiva** com TailwindCSS  

---

## 🔌 API (json-server)
### Exemplo de `db.json`
```json
{
  "vehicles": [
    {
      "id": "1",
      "placa": "ABC-1234",
      "marca": "Toyota",
      "modelo": "Corolla",
      "ano": 2020,
      "cor": "Prata"
    },
    {
      "id": "2",
      "placa": "XYZ-9876",
      "marca": "Honda",
      "modelo": "Civic",
      "ano": 2022,
      "cor": "Preto"
    }
  ]
}
```

### Endpoints disponíveis
- `GET /vehicles` → Lista veículos  
- `POST /vehicles` → Cria veículo  
- `PUT /vehicles/:id` → Atualiza veículo  
- `DELETE /vehicles/:id` → Remove veículo  

---

## 🧪 Testes com Postman
- Importar `postman_collection.json` incluído no repositório.  
- Testar requisições **GET, POST, PUT, DELETE** em `http://localhost:3000/vehicles`.
