<script>
  let { name, aisle, position, category, price } = $props();

  async function aggiungiAllaLista() {
  try {
    console.log('Invio richiesta per:', name);
    const res = await fetch(`http://localhost:3000/api/list/add/${encodeURIComponent(name)}`);
    const data = await res.json();
    console.log('Risposta:', res.status, data);

    if (!res.ok) {
      alert(data.message || 'Errore durante l\'aggiunta');
      return;
    }

    alert(`✔️ ${name} aggiunto alla lista!`);
  } catch (err) {
    console.error('Errore nella richiesta:', err);
    alert('Errore di rete');
  }
}

</script>

<div class="articolo">
  <h3>{name}</h3>
  <p><strong>Categoria:</strong> {category}</p>
  <p><strong>Corsia:</strong> {aisle}</p>
  <p><strong>Posizione:</strong> {position}</p>
  <p><strong>Prezzo:</strong> €{Number(price).toFixed(2)}</p>
  <button onclick={aggiungiAllaLista}>Aggiungi alla lista</button>
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
