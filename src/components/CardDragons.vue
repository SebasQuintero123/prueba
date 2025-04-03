<template>
    <div class="home">
      <MenuComponent />
      <h1>🐉 Enciclopedia de Dragones 🐉</h1>
  
      <div v-if="dragons.length" id="dragonsContainer">
        <div v-for="dragon in dragons" :key="dragon.nombre" class="dragon-card">
          <img :src="dragon.imagen" :alt="dragon.nombre" />
          <h3>{{ dragon.nombre }}</h3>
          <p><strong>🔥 Elemento:</strong> {{ dragon.elemento }}</p>
          <p><strong>🏔 Hábitat:</strong> {{ dragon.habitat }}</p>
          <p><strong>📜 Descripción:</strong> {{ dragon.descripcion }}</p>
          <p><strong>⚔️ Fuerza:</strong> {{ dragon.fuerza }}</p>
          <p><strong>✨ Habilidades:</strong> {{ dragon.habilidades_especiales }}</p>
        </div>
      </div>
      <p v-else class="loading">Cargando dragones...</p>
    </div>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import MenuComponent from "../components/MenuNumero1.vue";
  
  const dragons = ref([]);
  
  const fetchDragons = async () => {
    try {
      const response = await fetch("/dragones.json");
      const data = await response.json();
      dragons.value = data.dragones;
    } catch (error) {
      console.error("Error al cargar los datos de los dragones:", error);
    }
  };
  
  onMounted(fetchDragons);
  </script>
  
  <style scoped>
  /* Fondo épico */
  .home {
    text-align: center;
    padding: 20px;
    color: white;
    background: linear-gradient(180deg, #57360d, #fa8920, #912a2a);
    min-height: 100vh;
    font-family: 'Cinzel', serif;
  }
  
  h1 {
    font-size: 2.5rem;
    color: #ffcc00;
    text-shadow: 0px 0px 15px rgba(255, 204, 0, 0.7);
    margin-bottom: 20px;
  }
  
  /* Contenedor de dragones */
  #dragonsContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  /* Tarjetas con efecto dorado */
  .dragon-card {
    width: 280px;
    background: rgba(190, 39, 39, 0.15);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(255, 204, 0, 0.5);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    border: 2px solid rgba(255, 204, 0, 0.6);
    backdrop-filter: blur(10px);
    position: relative;
  }
  
  .dragon-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(255, 204, 0, 0.8);
  }
  
  .dragon-card img {
    width: 100%;
    border-radius: 10px;
    border: 3px solid #ffcc00;
    transition: transform 0.3s ease-in-out;
  }
  
  .dragon-card:hover img {
    transform: rotate(2deg) scale(1.03);
  }
  
  /* Texto */
  .dragon-card h3 {
    margin-top: 15px;
    font-size: 22px;
    color: #ffcc00;
    text-shadow: 0px 0px 8px rgba(255, 204, 0, 0.7);
  }
  
  .dragon-card p {
    font-size: 15px;
    color: #dcdcdc;
    margin: 5px 0;
  }
  
  /* Animación de carga */
  .loading {
    font-size: 20px;
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
    .dragon-card {
      width: 90%;
    }
  }
  </style>
  