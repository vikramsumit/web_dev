from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL") or "https://dummy.supabase.co"
key = os.getenv("SUPABASE_KEY") or "dummy"

if not url.startswith("http"):
    url = "https://dummy.supabase.co"

supabase: Client = create_client(
    url,
    key
)
