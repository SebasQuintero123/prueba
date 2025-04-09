<template>
  <div class="max-w-md mx-auto p-6 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl border border-green-300 mt-10">
    <h2 class="text-3xl font-bold mb-6 text-center text-green-800 font-sans tracking-wide">
       Reserva tu tatami en Neko Sushi 🍣
    </h2>

    <form @submit.prevent="enviarReserva" class="space-y-4">
      <div>
        <label class="block mb-1 font-semibold text-green-700">Nombre:</label>
        <input v-model="reserva.nombre" type="text" required class="input-style" placeholder="Tu nombre ronroneante..." />
      </div>

      <div>
        <label class="block mb-1 font-semibold text-green-700">Correo:</label>
        <input v-model="reserva.email" type="email" required class="input-style" placeholder="tusushi@nekosama.com" />
      </div>

      <div>
        <label class="block mb-1 font-semibold text-green-700">Fecha:</label>
        <input v-model="reserva.fecha" type="date" required class="input-style" />
      </div>

      <div>
        <label class="block mb-1 font-semibold text-green-700">Hora:</label>
        <input v-model="reserva.hora" type="time" required class="input-style" />
      </div>

      <div>
        <label class="block mb-1 font-semibold text-green-700">Número de personas:</label>
        <input v-model="reserva.personas" type="number" min="1" required class="input-style" />
      </div>

      <button type="submit"
        class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300">
        Reservar tatami 🐾
      </button>

      <p v-if="mensaje" class="mt-4 text-green-900 font-semibold text-center animate-bounce">
        {{ mensaje }}
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      reserva: {
        nombre: '',
        email: '',
        fecha: '',
        hora: '',
        personas: 1,
      },
      mensaje: ''
    };
  },
  methods: {
    async enviarReserva() {
      try {
        const res = await fetch('http://localhost:3000/reservas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.reserva),
        });

        if (res.ok) {
          this.mensaje = '¡Miau! Tu reserva fue recibida con éxito 🐟';
          this.reserva = { nombre: '', email: '', fecha: '', hora: '', personas: 1 };
        } else {
          this.mensaje = '¡Ups! Algo salió mal con la reserva 😿';
        }
      } catch (error) {
        console.error('Error al reservar:', error);
        this.mensaje = 'Error de conexión. Intenta más tarde.';
      }
    },
  },
};
</script>

<style scoped>
.input-style {
  width: 100%;
  padding: 0.6rem;
  border-radius: 1rem;
  border: 2px solid #c8f7c5;
  background-color: #e6ffe6;
  font-family: 'Segoe UI', sans-serif;
  font-size: 1rem;
  color: #2e7d32;
  transition: border-color 0.3s, background-color 0.3s;
}
.input-style:focus {
  border-color: #81c784;
  background-color: #d2f8d2;
  outline: none;
}
</style>
