import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'oglr78sr',
  dataset: 'production',
  apiVersion: '2025-06-18',
  useCdn: false,
});

async function testConnection() {
  console.log('=== SANITY CONNECTION TEST ===');
  console.log('Project ID: oglr78sr');
  console.log('Dataset: production');
  console.log('');

  // Test 1: Read all books
  try {
    const books = await client.fetch(`*[_type == "book"] | order(_createdAt desc) { _id, title, classType, price, availability, coverImage }`);
    console.log(`[READ] Books found: ${books.length}`);
    books.forEach((b, i) => {
      console.log(`  ${i+1}. ${b.title} (${b.classType}) - ₹${b.price} - ${b.availability ? 'Available' : 'Out of Stock'} - Cover: ${b.coverImage ? 'YES' : 'NO'}`);
    });
  } catch (error) {
    console.error('[READ] Books query failed:', error.message);
  }

  console.log('');

  // Test 2: Read site settings
  try {
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
    console.log(`[READ] Site Settings: ${settings ? JSON.stringify(settings) : 'NOT FOUND (will use defaults)'}`);
  } catch (error) {
    console.error('[READ] Settings query failed:', error.message);
  }

  console.log('');

  // Test 3: Read authors
  try {
    const authors = await client.fetch(`*[_type == "author"] { _id, name, designation }`);
    console.log(`[READ] Authors found: ${authors.length}`);
    authors.forEach((a, i) => {
      console.log(`  ${i+1}. ${a.name} ${a.designation ? `(${a.designation})` : ''}`);
    });
  } catch (error) {
    console.error('[READ] Authors query failed:', error.message);
  }

  console.log('');

  // Test 4: Test write (without token - expect failure)
  try {
    const result = await client.create({
      _type: 'book',
      title: 'Test Book from API',
      classType: 'Class 10',
      price: 100,
      availability: true,
    });
    console.log('[WRITE] SUCCESS - Book created:', result._id);
    // Clean up
    await client.delete(result._id);
    console.log('[WRITE] Cleanup - Test book deleted');
  } catch (error) {
    console.error('[WRITE] FAILED (expected without token):', error.message || error.responseBody);
  }

  console.log('');
  console.log('=== TEST COMPLETE ===');
}

testConnection();
