<template>
    <div>
      <h2>Cadastrar Clientes</h2>
      <div class="form-container">
        <h3>📋 Cliente</h3>
        <form @submit.prevent="salvar">
          <div class="form-group">
            <label for="classe">Classe</label>
            <select v-model="form.classe" id="classe">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="nivel">Nível</label>
            <select v-model="form.nivel" id="nivel">
              <option value="Junior">Junior</option>
              <option value="Pleno">Pleno</option>
              <option value="Senior">Sénior</option>
              <option value="PL">PL</option>
            </select>
          </div>
  
          <div class="form-group">
            <label for="semestre">Semestres</label>
            <select v-model="form.semestre" id="semestre">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
  
          <button type="submit" class="btn-salvar">Salvar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          classe: '',
          nivel: '',
          semestre: ''
        }
      };
    },
    methods: {
      salvar() {
        console.log("Dados salvos:", this.form);
      }
    }
  };
  </script>
  
  <style scoped>
  .form-container {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    background: #f8f8f8;
    max-width: 500px;
    margin: auto;
  }
  .form-group {
    margin-bottom: 15px;
  }
  label {
    display: block;
    font-weight: bold;
  }
  select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .btn-salvar {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 3px;
  }
  </style>
  