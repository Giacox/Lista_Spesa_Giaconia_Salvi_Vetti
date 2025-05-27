<script>
    import { createEventDispatcher } from 'svelte';
    const API_BASE = import.meta.env.VITE_API_URL;
  const dispatch = createEventDispatcher();
  let { name, aisle, position, category, price } = $props();
    async function rimuovi() {
        try {
            const response = await fetch(`${API_BASE}/api/articles/delete/${name}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Errore nella rimozione dell\'articolo');
            }
            dispatch('rimuovi');
        } catch (error) {
            console.error('Errore:', error);
        }
    }
</script>

<div class="articolo">
  <h3>{name}</h3>
  <p><strong>Categoria:</strong> {category}</p>
  <p><strong>Corsia:</strong> {aisle}</p>
  <p><strong>Posizione:</strong> {position}</p>
  <p><strong>Prezzo:</strong> €{Number(price).toFixed(2)}</p>
  <button type="button" onclick={rimuovi}>Rimuovi dal supermercato</button>
  <button type="button" onclick={() => window.location.href = `/Accesso/Dashboard/update/${name}`}>Modifica</button>
</div>

<style>
  .articolo {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #f9f9ff;
  }

  button {
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: #9381ff;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  button:hover {
    background-color: #7b6fe0;
  }
</style>
