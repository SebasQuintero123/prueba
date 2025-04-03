<template>
    <div class="menu">
    <h1>Menú Principal</h1>
    <div class="dropdown">
      <button @click="toggleMenu">☰ Menú</button>
      <ul v-if="menuOpen" class="dropdown-menu">
        <li @click="$router.push('/')">Rick</li>
        <li @click="$router.push('/dragones')">Dragones</li>
        <li @click="$router.push('/perfil')">Perfil</li>
      </ul>
    </div>
  </div>
    <router-view />
  </template>
  
  <script>
export default {
  name: "MenuComponent",
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
/* 🔥 Estilo del menú */
.menu {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #001f3f, #005f73);
  border-bottom: 3px solid #00d9ff;
  box-shadow: 0px 4px 10px rgba(0, 217, 255, 0.3);
}

/* 🔥 Estilo del título */
.menu h1 {
  color: #00d9ff;
  font-size: 28px;
  text-shadow: 0px 0px 10px rgba(0, 217, 255, 0.7);
  margin-bottom: 20px;
}

/* 🔥 Botón del menú desplegable */
.dropdown button {
  background: linear-gradient(135deg, #00d9ff, #007bff);
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 217, 255, 0.3);
  transition: all 0.3s ease-in-out;
}

/* 🔥 Hover en el botón */
.dropdown button:hover {
  background: linear-gradient(135deg, #00aaff, #0051ff);
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 217, 255, 0.5);
}

/* 🔥 Estilos del menú desplegable */
.dropdown-menu {
  list-style: none;
  padding: 10px;
  margin-top: 10px;
  background: rgba(0, 31, 63, 0.9);
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 217, 255, 0.3);
  transition: all 0.3s ease-in-out;
}

.dropdown-menu li {
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

/* 🔥 Efecto al pasar el mouse sobre las opciones */
.dropdown-menu li:hover {
  background: rgba(0, 217, 255, 0.2);
  transform: scale(1.05);
}
</style>
