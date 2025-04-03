<template>
    <div>
      <MenuComponent />
  
      <div class="profile-wrapper">
        <div class="profile-container" v-if="perfil">
          <img :src="perfil.imagen" alt="Foto de perfil" />
          <h2>{{ perfil.nombre }}</h2>
          <p><strong>Edad:</strong> {{ perfil.edad }}</p>
          <p><strong>Ocupación:</strong> {{ perfil.ocupacion }}</p>
          <p><strong>Ubicación:</strong> {{ perfil.ubicacion }}</p>
          <p>{{ perfil.descripcion }}</p>
  
          <h3>Contacto</h3>
          <div class="contact-info">
            <p>Email: <a :href="'mailto:' + perfil.contacto.email">{{ perfil.contacto.email }}</a></p>
            <p>Teléfono: {{ perfil.contacto.telefono }}</p>
          </div>
  
          <h3>Habilidades</h3>
          <ul>
            <li v-for="habilidad in perfil.habilidades" :key="habilidad">{{ habilidad }}</li>
          </ul>
  
          <h3>Redes Sociales</h3>
          <div class="social-links">
            <a :href="perfil.redes.github" target="_blank">GitHub</a>
            <a :href="perfil.redes.linkedin" target="_blank">LinkedIn</a>
            <a :href="perfil.redes.instagram" target="_blank">Instagram</a>
          </div>
        </div>
  
        <p v-else class="loading">Cargando perfil...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import MenuComponent from "../components/MenuNumero1.vue";
  
  const perfil = ref(null);
  
  const cargarPerfil = async () => {
    try {
      const response = await fetch("/perfil.json");
      const data = await response.json();
      perfil.value = data.perfil;
    } catch (error) {
      console.error("Error al cargar el perfil:", error);
    }
  };
  
  onMounted(cargarPerfil);
  </script>
  
  <style scoped>
  
  .home {
    text-align: center;
    padding: 20px;
    color: white;
    background: linear-gradient(180deg, #1a1a2e, #16213e, #0f3460);
    min-height: 100vh;
    font-family: 'Cinzel', serif;
  }
  
  /* Fondo con espacio suficiente arriba */
  .profile-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding-top: 80px; /* 🔥 Espacio extra para evitar que choque con el menú */
    padding-bottom: 80px;
    background: linear-gradient(135deg, #1e1e2f, #2b2d42);
  }
  
  /* Tarjeta con fondo más opaco */
  .profile-container {
    background: rgba(255, 255, 255, 0.25); /* 🔥 Más opacidad para mejor lectura */
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0px 4px 15px rgba(255, 255, 255, 0.2);
    max-width: 450px;
    width: 100%;
    text-align: center;
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  
  /* Foto de perfil con mejor escala */
  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    border: 4px solid #ffcc00;
    margin-bottom: 15px;
    transition: transform 0.3s;
  }
  
  img:hover {
    transform: scale(1.05);
  }
  
  /* Títulos */
  h2 {
    font-size: 28px;
    color: #ffcc00;
  }
  
  h3 {
    margin-top: 15px;
    font-size: 20px;
    color: #ffcc00;
    border-bottom: 2px solid #ffcc00;
    display: inline-block;
    padding-bottom: 5px;
  }
  
  /* Lista de habilidades con más contraste */
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    background: #ffcc00;
    color: #1e1e2f;
    font-weight: bold;
    display: inline-block;
    margin: 5px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 14px;
    transition: background 0.3s, transform 0.3s;
  }
  
  ul li:hover {
    background: #ffd700;
    transform: scale(1.05);
  }
  
  /* Botones de redes sociales con más contraste */
  .social-links a {
    display: inline-block;
    color: #1e1e2f;
    text-decoration: none;
    margin: 5px;
    padding: 8px 12px;
    border-radius: 8px;
    background: #ffcc00;
    font-weight: bold;
    transition: background 0.3s, transform 0.3s;
  }
  
  .social-links a:hover {
    background: #ffd700;
    transform: scale(1.1);
  }
  
  /* Enlaces de contacto */
  .contact-info a {
    color: #ffcc00;
    font-weight: bold;
  }
  
  .contact-info a:hover {
    text-decoration: underline;
  }
  
  /* Animación de carga */
  .loading {
    font-size: 18px;
    color: #ffcc00;
    animation: glow 1.5s infinite alternate;
  }
  
  @keyframes glow {
    from {
      text-shadow: 0 0 5px #ffcc00;
    }
    to {
      text-shadow: 0 0 15px #ffcc00;
    }
  }
  
  /* Responsivo */
  @media (max-width: 768px) {
    .profile-container {
      width: 90%;
    }
  }
  </style>
  