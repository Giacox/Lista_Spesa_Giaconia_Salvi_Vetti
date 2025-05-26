<script>
  import Articoli from './../../lib/Articoli.svelte';
</script>

<div class="intestazione">
    <h1>Articoli del Supermercato</h1>
    <p>Benvenuti nella nostra lista di articoli disponibili!</p>
</div>
<button type="button" onclick={() => window.location.href = '/Articles/List'}>Vai alla lista della spesa</button>
<button type="button" onclick={() => window.location.href = '/'}>Home</button>
<Articoli />

<style>
  .intestazione {
    text-align: center;
    padding: 2rem 1rem;
    background-color: #9381FF;
    color: white;
    border-bottom: 4px solid #B8B8FF;
  }

  .intestazione h1 {
    margin: 0;
    font-size: 2.5rem;
  }

  .intestazione p {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    color: #EDEBFF;
  }
  button {
    display: block;
    margin: 2rem auto;
    padding: 0.75rem 1.5rem;
    background-color: #B8B8FF;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: #9381FF;
  }
</style>
