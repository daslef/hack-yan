import { createClient } from "@refinedev/supabase"

const SUPABASE_URL = "https://pynmygjbmgoerpqukilp.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5bm15Z2pibWdvZXJwcXVraWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMTc5NDAsImV4cCI6MjAyNzg5Mzk0MH0.ZufLS9gDGjICuCYYY3-OYTJBs3bjowfMYvbYE5zonPs"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
    db: {
        schema: "public",
    },
    auth: {
        persistSession: true,
    }
});