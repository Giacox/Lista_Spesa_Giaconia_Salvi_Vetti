<script>
  let email = '';
  let password = '';
  let error = '';

  async function login() {
    error = '';
    const res = await fetch("http://localhost:3000/api/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      window.location.href = '/Accesso/Dashboard';
    } else {
      error = data.message || 'Errore di login';
    }
  }
</script>
<div class="intestazione">
    <h1>Login Admin</h1>
</div>
<button onclick={() => window.location.href = '/'}>Torna alla Home</button>
{#if error}
  <p style="color:red">{error}</p>
{/if}

<div class="login-container">
  <input bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button onclick={login}>Login</button>
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

  .login-container {
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