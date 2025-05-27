

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", sans-serif;
    background-color: #ede3ff;
    color: #333;
  }

  .intestazione {
    background-color: #9381FF;
    color: white;
    padding: 2rem;
    text-align: center;
  }

  .container {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
  }

  .card {
    background-color: #FFEEDD;
    border: 2px solid #FFD8BE;
    border-radius: 1rem;
    padding: 1.5rem;
    width: 300px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .card h2 {
    color: #9381FF;
    margin-bottom: 1rem;
  }

  .card p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #555;
  }

  .card button {
    background-color: #B8B8FF;
    border: none;
    padding: 0.8rem 1.2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
  }

  .card button a {
    text-decoration: none;
    color: inherit;
  }
</style>

<div class="intestazione">
  <h1>🛒Benvenuto in EasyMarket🛒</h1>
  <h2>Qui potrai creare un lista della spesa ottimizzata che ti aiuterà con i tuoi acquisti in modo facile e veloce!</h2>
</div>

<div class="container">
  <div class="card">
    <h2>Lista della spesa</h2>
    <p>In questa sezione potrai creare una lista della spesa personalizzata in base ai tuoi gusti e alle tue esigenze.</p>
    <button><a href="/Articles">Visualizza gli articoli</a></button>
  </div>
  <div class="card">
    <h2>Admin</h2>
    <p>In questa sezione potrai gestire i prodotti e le categorie del tuo negozio.</p>
    <button><a href="/Accesso">Gestisci il tuo negozio</a></button>
  </div>
</div>
