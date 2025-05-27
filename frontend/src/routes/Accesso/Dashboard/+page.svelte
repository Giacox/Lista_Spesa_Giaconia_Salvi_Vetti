<script>
  import ArticoliAdmin from "$lib/ArticoliAdmin.svelte";

  function goToAdd() {
    window.location.href = '/Accesso/Dashboard/add';
  }

  function goHome() {
    window.location.href = '/';
  }
</script>

<div class="intestazione">
  <h1>Benvenuto in EasyMarket</h1>
  <p>Qui puoi gestire gli articoli del tuo negozio.</p>
</div>

<div class="buttons">
  <button onclick={goToAdd}>Aggiungi Articolo</button>
  <button onclick={goHome}>Torna alla home</button>
</div>

<ArticoliAdmin />

<style>
  .intestazione {
    background-color: #9381FF;
    color: white;
    padding: 2rem;
    text-align: center;
  }

  .buttons {
    margin-top:1rem; ;
    margin-bottom: 1rem;
    display: flex;
    gap: 1rem;
    justify-content: center;

  }

  button {
    padding: 0.6rem 1.2rem;
    background-color: #9381ff;
    border: none;
    border-radius: 5px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #7b6fe0;
  }
</style>
