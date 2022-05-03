<script lang="ts">
  import { onMount } from "svelte";

  let status: string = "Idle";
  let fileName: string = "";

  onMount(() => {
    const eventSource = new EventSource("http://localhost:9009/events");

    eventSource.addEventListener("message", handleEventSourceMessage);

    return () => {
      eventSource.close();
    };
  });

  function handleEventSourceMessage(event: any): void {
    const data = JSON.parse(event.data);

    fileName = data.fileName;

    status = "Complete";
  }

  async function handleRequestClick(): Promise<void> {
    status = "Requesting";

    await fetch("http://localhost:9009/export", {
      method: "POST",
      body: JSON.stringify({ filePath: "/some/file" }),
    });
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

  <p>File Name: {fileName}</p>
</main>
