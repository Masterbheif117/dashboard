import postgres from 'postgres';

// Initialize the connection to the database using the environment variable
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Function to fetch invoices where the amount is 666
async function listInvoices() {
  const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;
  return data;
}

export async function GET() {
  
  try {
  	return Response.json(await listInvoices());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
