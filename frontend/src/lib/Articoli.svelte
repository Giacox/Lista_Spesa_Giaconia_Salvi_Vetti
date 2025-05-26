<script>
  import { onMount } from 'svelte';
  import Articolo from './Articolo.svelte';

  let articoli = [];

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/articles');
      if (!res.ok) throw new Error('Errore nella richiesta');
      articoli = await res.json();
    } catch (err) {
      console.error('Errore nel recupero articoli:', err);
    }
  });
</script>

{#if articoli.length > 0}
  <div class="container">
    {#each articoli as articolo (articolo._id)}
      <div class="card">
        <Articolo
          name={articolo.name}
          aisle={articolo.aisle}
          position={articolo.position}
          category={articolo.category}
          price={articolo.price}
        />
      </div>
    {/each}
  </div>
{:else}
  <p>Caricamento articoli...</p>
{/if}

<style>
  .container {
    max-width: 960px;
    margin: 2rem auto;
    padding: 0 1rem;
    background-color: #F8F7FF; 
    border-radius: 1rem;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }

  .card {
    background-color: #EDEBFF; 
    border: 2px solid #B8B8FF; 
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(147, 129, 255, 0.3);
    text-align: center;
    transition: transform 0.2s ease;
  }
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(147, 129, 255, 0.5);
  }

  @media (max-width: 900px) {
    .container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .container {
      grid-template-columns: 1fr;
    }
  }

  p {
    font-size: 1.1rem;
    color: #9381FF;
    text-align: center;
  }
</style>