<script lang="ts">
  let status: string = "Idle";

  async function handleRequestClick(): Promise<void> {
    status = "Requesting";

    const response = await fetch("http://localhost:9009/export", {
      method: "POST",
      body: JSON.stringify({ file: "/some/file" }),
    });

    console.log(response);
  }
</script>

<style>
  main {
    padding: 1rem;
    margin: 0 auto;
  }
</style>

<main>
  <h1>Test</h1>

  <button on:click={handleRequestClick}>Request Export!</button>

  <p>{status}</p>
</main>
