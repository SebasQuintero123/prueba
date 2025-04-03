<template>
    <div class="rick-home">
        <MenuNumero1 />
  
      <div class="title-container">
        <h1>Personajes de Rick and Morty</h1>
      </div>
      
      <div v-if="!selectedCharacter">
        <div id="charactersContainer">
          <div v-for="character in characters" :key="character.id" class="character-card">
            <img :src="character.image" :alt="character.name" />
            <h3>{{ character.name }}</h3>
            <p>Estado: <span :class="getStatusClass(character.status)">{{ character.status }}</span></p>
            <button @click="showCharacterDetails(character)">Ver Detalles</button>
          </div>
        </div>
      </div>
  
      <div v-else id="characterDetails">
        <button @click="goBack">Volver</button>
        <h2>{{ selectedCharacter.name }}</h2>
        <img :src="selectedCharacter.image" :alt="selectedCharacter.name" />
        <p><strong>Sexo:</strong> {{ selectedCharacter.gender }}</p>
        <p><strong>Especie:</strong> {{ selectedCharacter.species }}</p>
        <p><strong>Origen:</strong> {{ selectedCharacter.origin.name }}</p>
        <p><strong>Ubicación actual:</strong> {{ selectedCharacter.location.name }}</p>
        <h3>Episodios en los que aparece:</h3>
        <ul>
          <li v-for="episode in episodes" :key="episode.id">{{ episode.episode }} - {{ episode.name }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import MenuNumero1 from '../components/MenuNumero1.vue';
  
  const apiUrl = 'https://rickandmortyapi.com/api/character';
  const characters = ref([]);
  const selectedCharacter = ref(null);
  const episodes = ref([]);
  
  const getCharacters = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      characters.value = data.results;
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
    }
  };
  
  const showCharacterDetails = async (character) => {
    selectedCharacter.value = character;
    episodes.value = [];
    try {
      const episodesData = await Promise.all(
        character.episode.map(url => fetch(url).then(res => res.json()))
      );
      episodes.value = episodesData;
    } catch (error) {
      console.error('Error al obtener los episodios:', error);
    }
  };
  
  const goBack = () => {
    selectedCharacter.value = null;
    episodes.value = [];
  };
  
  const getStatusClass = (status) => {
    return status === 'Alive' ? 'status-alive' : status === 'Dead' ? 'status-dead' : 'status-unknown';
  };
  
  onMounted(() => {
    getCharacters();
  });
  </script>
  
  <style scoped>
  /* 🔵 Fondo azul claro con degradado */
  .rick-home {
    text-align: center;
    padding: 20px;
    color: #0a0a0a;
    background: linear-gradient(180deg, #a3d5ff, #87c3ff, #6aa8ff);
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
  }
  
  /* ✨ Título con efecto de luz */
  .title-container h1 {
    color: #003366;
    font-size: 2.5rem;
    text-shadow: 0px 0px 15px rgba(0, 51, 102, 0.7);
    margin-bottom: 20px;
  }
  
  /* 📌 Contenedor de personajes */
  #charactersContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding: 20px;
  }
  
  /* 🎴 Tarjetas de personajes */
  .character-card {
    width: 250px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    padding: 15px;
    text-align: center;
    box-shadow: 0px 4px 10px rgba(0, 51, 102, 0.5);
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
  
  .character-card:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 51, 102, 0.8);
  }
  
  /* 📷 Imágenes de personajes */
  .character-card img {
    width: 100%;
    border-radius: 10px;
    border: 4px solid #003366;
    transition: transform 0.3s ease-in-out;
  }
  
  .character-card:hover img {
    transform: rotate(2deg) scale(1.03);
  }
  
  /* 🟢 Estado de los personajes */
  .status-alive {
    color: #28a745;
    font-weight: bold;
  }
  .status-dead {
    color: #dc3545;
    font-weight: bold;
  }
  .status-unknown {
    color: #ffc107;
    font-weight: bold;
  }
  
  /* 🛑 Botones con efecto */
  button {
    background-color: #008bb2; /* Azul más oscuro */
    color: white;
    border: 2px solid white; /* Borde blanco para resaltarlo */
    padding: 10px 15px;
    margin-top: 10px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0px 4px 8px rgba(255, 255, 255, 0.3); /* Sombra suave */
  }
  
  button:hover {
    background-color: #006b8d; /* Azul aún más oscuro al pasar el mouse */
    border-color: #ffdd57; /* Cambio de borde a amarillo para resaltar */
    box-shadow: 0px 6px 12px rgba(255, 221, 87, 0.6); /* Sombra amarilla */
  }
  
  /* 📜 Detalles de personaje */
  #characterDetails {
    max-width: 450px;
    margin: auto;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0px 5px 10px rgba(0, 217, 255, 0.4);
    background: rgba(72, 183, 231, 0.85);
    text-align: center;
    color: white;
  }
  
  #characterDetails img {
    width: 100%;
    border-radius: 10px;
    border: 4px solid #00d9ff;
  }
  
  #characterDetails button {
    background-color: #b22222; /* Rojo oscuro */
    border: 2px solid white;
  }
  
  #characterDetails button:hover {
    background-color: #8b0000;
    border-color: #ff6b6b;
    box-shadow: 0px 6px 12px rgba(255, 107, 107, 0.6);
  }
  
  /* 📌 Lista de episodios */
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    background-color: rgba(255, 255, 255, 0.15);
    margin: 5px 0;
    padding: 10px;
    border-radius: 8px;
    color: white;
  }
  
  /* 📱 Responsividad */
  @media (max-width: 1024px) { .character-card { width: 31%; } }
  @media (max-width: 768px) { .character-card { width: 48%; } }
  @media (max-width: 480px) { .character-card { width: 100%; } }
  </style>
  