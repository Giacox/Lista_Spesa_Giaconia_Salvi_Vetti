<script>
  import Lista from '$lib/Lista.svelte';
</script>

<div class="intestazione">
  <h1>La tua lista ottimizzata</h1>
  <p>Questa è la tua lista nell'ordine di ritiro</p>
</div>
<button type="button"><a href="/Articles">Torna agli articoli</a></button>
<Lista />

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
</style>
