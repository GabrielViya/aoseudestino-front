<template>
    <div class="registration-form">
      <h1>AgroEntrega</h1>
      <h2>Conta Transportador</h2>
  
      <form @submit.prevent="submitForm">
        <!-- Dados básicos -->
        <div class="form-group">
          <label>Nome Completo</label>
          <input type="text" v-model="formData.fullName" required>
        </div>
  
        <div class="form-group">
          <label>Telefone</label>
          <input type="tel" v-model="formData.phone" required>
        </div>
  
        <div class="form-group">
          <label>E-mail</label>
          <input type="email" v-model="formData.email" required>
        </div>
  
        <div class="form-group">
          <label>Senha</label>
          <input type="password" v-model="formData.password" required>
        </div>
  
        <div class="form-group">
          <label>Confirmar Senha</label>
          <input type="password" v-model="formData.confirmPassword" required>
        </div>
  
        <!-- Upload de documentos -->
        <div class="document-section">
          <h3>Documentação Necessária</h3>
  
          <div class="form-group">
            <label>Fotografia Pessoal (rosto)</label>
            <input type="file" @change="handleFileUpload('photo', $event)" accept="image/*">
            <p v-if="uploadedFiles.photo">Arquivo carregado: {{ uploadedFiles.photo.name }}</p>
          </div>
  
          <div class="form-group">
            <label>Carta de Condução</label>
            <div class="double-upload">
              <div>
                <label>Frente</label>
                <input type="file" @change="handleFileUpload('licenseFront', $event)" accept="image/*">
                <p v-if="uploadedFiles.licenseFront">Frente carregada</p>
              </div>
              <div>
                <label>Verso</label>
                <input type="file" @change="handleFileUpload('licenseBack', $event)" accept="image/*">
                <p v-if="uploadedFiles.licenseBack">Verso carregado</p>
              </div>
            </div>
          </div>
  
          <div class="form-group">
            <label>Bilhete de Identidade</label>
            <div class="double-upload">
              <div>
                <label>Frente</label>
                <input type="file" @change="handleFileUpload('idFront', $event)" accept="image/*">
                <p v-if="uploadedFiles.idFront">Frente carregada</p>
              </div>
              <div>
                <label>Verso</label>
                <input type="file" @change="handleFileUpload('idBack', $event)" accept="image/*">
                <p v-if="uploadedFiles.idBack">Verso carregado</p>
              </div>
            </div>
          </div>
        </div>
  
        <button type="submit" class="submit-btn">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          fullName: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        uploadedFiles: {
          photo: null,
          licenseFront: null,
          licenseBack: null,
          idFront: null,
          idBack: null
        }
      }
    },
    methods: {
      handleFileUpload(field, event) {
        const file = event.target.files[0];
        if (file) {
          // Verificar tamanho do arquivo (5MB máximo)
          if (file.size > 5 * 1024 * 1024) {
            alert('O arquivo é muito grande. Tamanho máximo permitido: 5MB');
            return;
          }
          
          // Verificar tipo de arquivo
          if (!file.type.match('image.*')) {
            alert('Por favor, carregue apenas imagens (JPEG, PNG)');
            return;
          }
          
          this.uploadedFiles[field] = file;
        }
      },
      async submitForm() {
        // Validar senhas
        if (this.formData.password !== this.formData.confirmPassword) {
          alert('As senhas não coincidem');
          return;
        }
  
        // Verificar se todos os documentos foram carregados
        for (const field in this.uploadedFiles) {
          if (!this.uploadedFiles[field]) {
            alert('Por favor, carregue todos os documentos necessários');
            return;
          }
        }
  
        // Criar FormData para envio
        const formData = new FormData();
        
        // Adicionar dados do formulário
        for (const key in this.formData) {
          formData.append(key, this.formData[key]);
        }
        
        // Adicionar arquivos
        for (const field in this.uploadedFiles) {
          formData.append(field, this.uploadedFiles[field]);
        }
  
        try {
          // Aqui você faria a chamada à API
          // const response = await axios.post('/api/register', formData, {
          //   headers: {
          //     'Content-Type': 'multipart/form-data'
          //   }
          // });
          
          alert('Cadastro realizado com sucesso!');
          // Resetar formulário
          this.resetForm();
        } catch (error) {
          console.error('Erro no cadastro:', error);
          alert('Ocorreu um erro durante o cadastro. Por favor, tente novamente.');
        }
      },
      resetForm() {
        this.formData = {
          fullName: '',
          phone: '',
          email: '',
          password: '',
          confirmPassword: ''
        };
        
        this.uploadedFiles = {
          photo: null,
          licenseFront: null,
          licenseBack: null,
          idFront: null,
          idBack: null
        };
        
        // Resetar inputs de arquivo
        document.querySelectorAll('input[type="file"]').forEach(input => {
          input.value = '';
        });
      }
    }
  }
  </script>
  
  <style scoped>
  .registration-form {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1, h2, h3 {
    color: #333;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="tel"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .document-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  
  .double-upload {
    display: flex;
    gap: 20px;
  }
  
  .double-upload > div {
    flex: 1;
  }
  
  .submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;
  }
  
  .submit-btn:hover {
    background-color: #45a049;
  }
  
  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
  }
  </style>