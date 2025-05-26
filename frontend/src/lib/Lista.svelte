<script>
  import { onMount } from 'svelte';
  import ArticoloLista from './ArticoloLista.svelte';

  let lista = [];
  let mostraMappa = false;

  onMount(async () => {
    try {
      const res = await fetch('http://localhost:3000/api/list');
      if (!res.ok) throw new Error('Errore nella richiesta');
      lista = await res.json();
    } catch (err) {
      console.error('Errore nel recupero articoli:', err);
    }
  });

  async function svuotaLista() {
    try {
      const res = await fetch('http://localhost:3000/api/list/svuota', { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Errore durante lo svuotamento');
        return;
      }
      lista = [];
    } catch (err) {
      console.error('Errore durante lo svuotamento:', err);
    }
  }

  function toggleMappa() {
    mostraMappa = !mostraMappa;
  }

  const aisleSpacing = 120;
  const positionSpacing = 30;

  function getCoord(aisle, position) {
    return {
      x: 50 + (aisle - 1) * aisleSpacing,
      y: 50 + position * positionSpacing
    };
  }
</script>

<button type="button" on:click={toggleMappa} class="btn-mappa">
  {mostraMappa ? 'Nascondi mappa' : 'Mostra mappa'}
</button>

{#if lista.length > 0}
  <button type="button" on:click={svuotaLista} class="btn-svuota">Svuota lista</button>
  <div class="container">
    {#each lista as articolo (articolo.name)}
      <div class="card">
        <ArticoloLista
          name={articolo.name}
          aisle={articolo.aisle}
          position={articolo.position}
          category={articolo.category}
          price={articolo.price}
          on:rimuovi={async () => {
            try {
              const res = await fetch(`http://localhost:3000/api/list/remove/${encodeURIComponent(articolo.name)}`, { method: 'DELETE' });
              const data = await res.json();
              if (!res.ok) {
                alert(data.message || 'Errore durante la rimozione');
                return;
              }
              lista = lista.filter(a => a.name !== articolo.name);
            } catch (err) {
              console.error('Errore durante la rimozione:', err);
            }
          }}
        />
      </div>
    {/each}
  </div>
{:else}
  <p>La tua lista è vuota. Aggiungi articoli per iniziare!</p>
{/if}

{#if mostraMappa}
  <div class="mappa-container" aria-label="Mappa corsie supermercato">
    <svg width="100%" height="500" viewBox={`0 0 ${50 + aisleSpacing * 11} 500`} role="img" aria-describedby="descrizione-mappa">
      <desc id="descrizione-mappa">Mappa con 11 corsie del supermercato e articoli</desc>

      {#each Array(11) as _, i}
        <rect
          x={50 + i * aisleSpacing}
          y="0"
          width="80"
          height="500"
          fill="#EDEBFF"
          stroke="#B8B8FF"
          stroke-width="2"
          rx="10"
          ry="10"
          class="aisle"
          style="animation-delay: {i * 0.1}s"
        />
        <text
          x={90 + i * aisleSpacing}
          y="25"
          text-anchor="middle"
          fill="#9381FF"
          font-weight="bold"
          font-size="16"
          pointer-events="none"
          class="aisle-label"
          style="animation-delay: {i * 0.1 + 0.3}s"
        >
          Corsia {i + 1}
        </text>
      {/each}

      {#each lista as articolo (articolo.name)}
        {@const coord = getCoord(articolo.aisle, articolo.position)}
        <circle
          cx={coord.x}
          cy={coord.y}
          r="8"
          fill="#FFD8BE"
          stroke="#9381FF"
          stroke-width="2"
          class="item-circle"
        />
        <text
          x={coord.x + 14}
          y={coord.y + 5}
          font-size="14"
          fill="#333"
          font-weight="600"
          pointer-events="none"
          class="item-label"
        >
          {articolo.name}
        </text>
      {/each}
    </svg>
  </div>
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

  button {
    display: block;
    margin: 1rem auto 1.5rem;
    padding: 0.75rem 1.5rem;
    background-color: #B8B8FF;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    max-width: 220px;
  }
  button:hover {
    background-color: #9381FF;
  }
  .btn-mappa { margin-top: 0; }
  .btn-svuota { margin-bottom: 2rem; }

  .mappa-container {
    margin: 2rem auto;
    padding: 1rem;
    background-color: #F8F7FF;
    border: 2px solid #B8B8FF;
    border-radius: 1rem;
    max-width: 100%;
    overflow-x: auto;
  }

  .aisle { opacity: 0; transform: translateY(20px); animation: fadeUp 0.5s forwards; }
  .aisle-label { opacity: 0; transform: translateY(20px); animation: fadeUp 0.5s forwards; }
  .item-circle { opacity: 0; transform: scale(0); animation: popIn 0.4s forwards; animation-delay: 0.5s; cursor: pointer; }
  .item-label { opacity: 0; animation: fadeIn 0.5s forwards; animation-delay: 0.8s; }

  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  @keyframes popIn { to { opacity: 1; transform: scale(1); } }
  @keyframes fadeIn { to { opacity: 1; } }

  p {
    font-size: 1.1rem;
    color: #9381FF;
    text-align: center;
  }
  @media (max-width: 900px) {
    .container { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 500px) {
    .container { grid-template-columns: 1fr; }
  }
</style>
