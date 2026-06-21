// js/dashboard/dashboard.js
import { supabase } from "../supabase.js";
import { fetchClients, removeClientFromDb } from "../data/clientsDb.js";
import { renderClientsCards } from "./render.js";
import { toastMsg } from "../components/toast.js";

export async function initClients() {

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      window.location.href = "../auth/login.html";
      return;
    }

    const clients = await fetchClients(user.id);

    renderClientsCards(clients, async (id) => {
      if (confirm("Are you sure you want to delete Client info?")) {
        await removeClientFromDb(id);
        // Reload dashboard rows locally down pipeline
        initClients();
      }
    }, user.id);
  } catch (error) {
    toastMsg("Error loading clients", "error")
    console.error("Clients error:", error.message);
  } 
}
