<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  const API_BASE = import.meta.env.VITE_API_URL;
  let name = '';
  let category = '';
  let aisle = '';
  let position = '';
  let price = '';
  let message = '';
  let originalName = '';

  $: nameParam = $page.params.name;

  onMount(async () => {
    const res = await fetch(`${API_BASE}/api/articles`);
    const articles = await res.json();
    const article = articles.find(a => a.name === nameParam);
    if (article) {
      name = article.name;
      category = article.category;
      aisle = article.aisle;
      position = article.position;
      price = article.price;
      originalName = article.name;
    }
  });

  async function updateArticle() {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const res = await fetch(`${API_BASE}/api/articles/update/${originalName}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
  body: JSON.stringify({
    name,
    category,
    aisle: parseInt(aisle),
    position: parseInt(position),
    price: parseFloat(price)
  })
});


    const data = await res.json();
    message = data.message;
  }
</script>

<div class="intestazione">
    <h1>Modifica Articolo: {originalName}</h1>
</div>
<button onclick={() => window.location.href = '/Accesso/Dashboard'}>Torna alla Dashboard</button>
{#if message}<p>{message}</p>{/if}
<div class="container"><input bind:value={name} placeholder="Nome" />
<input bind:value={category} placeholder="Categoria" />
<input type="number" bind:value={aisle} placeholder="Corsia" />
<input type="number" bind:value={position} placeholder="Posizione" />
<input type="number" step="0.01" bind:value={price} placeholder="Prezzo" />
<button onclick={updateArticle}>Modifica</button>
</div>

<style>
  :global(body) {
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f0f0ff;
  }

  .intestazione {
    background-color: #9381FF;
    color: white;
    padding: 2rem;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
    width: 90vw;
    margin-top: 1rem;
  }

  input {
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 1rem;
    outline-offset: 2px;
  }

  input:focus {
    border-color: #9381ff;
    box-shadow: 0 0 5px #9381ffaa;
  }

  button {
    margin-top: 1rem;
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

  p {
    margin-top: 1rem;
    color: #d9534f; 
    font-weight: 600;
  }
</style>
