import { createClient } from '@sanity/client';

// Test with token from .env or command line
const token = process.argv[2] || process.env.SANITY_TOKEN || '';

const client = createClient({
  projectId: 'oglr78sr',
  dataset: 'production',
  apiVersion: '2025-06-18',
  useCdn: false,
  token: token || undefined,
});

async function fullTest() {
  console.log('=== FULL END-TO-END SANITY TEST ===');
  console.log(`Token provided: ${token ? 'YES' : 'NO'}`);
  console.log('');

  if (!token) {
    console.log('❌ No token provided. Cannot test write operations.');
    console.log('');
    console.log('To get a token:');
    console.log('1. Go to https://www.sanity.io/manage/project/oglr78sr');
    console.log('2. Go to API > Tokens > Add API Token');
    console.log('3. Set permissions to "Editor"');
    console.log('4. Copy the token');
    console.log('5. Run: node test-sanity-full.js YOUR_TOKEN_HERE');
    console.log('   OR add VITE_SANITY_TOKEN=YOUR_TOKEN to .env');
    console.log('');
    
    // Still test reads
    console.log('--- Testing READ operations ---');
    const books = await client.fetch('*[_type == "book"]{ _id, title }');
    console.log(`Books in dataset: ${books.length}`);
    const settings = await client.fetch('*[_type == "siteSettings"][0]');
    console.log(`Settings: ${settings ? 'Found' : 'Not found (defaults will be used)'}`);
    const authors = await client.fetch('*[_type == "author"]{ _id, name }');
    console.log(`Authors: ${authors.length}`);
    return;
  }

  // ====== TEST 1: CREATE A BOOK ======
  console.log('--- TEST 1: CREATE BOOK ---');
  let bookId;
  try {
    const book = await client.create({
      _type: 'book',
      title: 'E2E Test Book - Mathematics Guide',
      classType: 'Class 10',
      price: 450,
      shortDescription: 'A test book created via API',
      fullDescription: 'Full description for end-to-end testing',
      publisher: 'Claret Publications',
      edition: '2025-26 Edition',
      language: 'English',
      availability: true,
      featuredBook: true,
      rating: 4.5,
    });
    bookId = book._id;
    console.log(`✅ Book created: ${book._id}`);
    console.log(`   Title: ${book.title}`);
  } catch (error) {
    console.error('❌ Create failed:', error.message);
    return;
  }

  // ====== TEST 2: VERIFY BOOK EXISTS ======
  console.log('');
  console.log('--- TEST 2: VERIFY BOOK IN SANITY ---');
  try {
    const fetched = await client.fetch('*[_type == "book" && _id == $id][0]', { id: bookId });
    if (fetched) {
      console.log(`✅ Book found in Sanity:`);
      console.log(`   Title: ${fetched.title}`);
      console.log(`   Class: ${fetched.classType}`);
      console.log(`   Price: ₹${fetched.price}`);
      console.log(`   Available: ${fetched.availability}`);
      console.log(`   Featured: ${fetched.featuredBook}`);
    } else {
      console.log('❌ Book NOT found after creation');
    }
  } catch (error) {
    console.error('❌ Verify failed:', error.message);
  }

  // ====== TEST 3: VERIFY IN ALL BOOKS QUERY ======
  console.log('');
  console.log('--- TEST 3: VERIFY IN ALL BOOKS LIST ---');
  try {
    const allBooks = await client.fetch('*[_type == "book"] | order(_createdAt desc) { _id, title, classType, price }');
    console.log(`✅ Total books: ${allBooks.length}`);
    const found = allBooks.find(b => b._id === bookId);
    console.log(`   Test book in list: ${found ? 'YES ✅' : 'NO ❌'}`);
  } catch (error) {
    console.error('❌ List failed:', error.message);
  }

  // ====== TEST 4: UPDATE THE BOOK ======
  console.log('');
  console.log('--- TEST 4: UPDATE BOOK ---');
  try {
    const updated = await client.patch(bookId).set({
      title: 'E2E Test Book - UPDATED Title',
      price: 500,
    }).commit();
    console.log(`✅ Book updated:`);
    console.log(`   New Title: ${updated.title}`);
    console.log(`   New Price: ₹${updated.price}`);
  } catch (error) {
    console.error('❌ Update failed:', error.message);
  }

  // ====== TEST 5: VERIFY UPDATE ======
  console.log('');
  console.log('--- TEST 5: VERIFY UPDATE ---');
  try {
    const fetched = await client.fetch('*[_type == "book" && _id == $id][0]{ title, price }', { id: bookId });
    console.log(`   Title: ${fetched.title} ${fetched.title === 'E2E Test Book - UPDATED Title' ? '✅' : '❌'}`);
    console.log(`   Price: ₹${fetched.price} ${fetched.price === 500 ? '✅' : '❌'}`);
  } catch (error) {
    console.error('❌ Verify update failed:', error.message);
  }

  // ====== TEST 6: CREATE SITE SETTINGS ======
  console.log('');
  console.log('--- TEST 6: CREATE/UPDATE SITE SETTINGS ---');
  try {
    await client.createIfNotExists({
      _id: 'siteSettings',
      _type: 'siteSettings',
      whatsappNumber: '919652745858',
      websiteTitle: 'Claret Publications',
      contactEmail: 'info@claretpublications.com',
      contactPhone: '9652745858',
      publicationName: 'Claret Publications',
      logoText: 'Claret Publications',
      address: '123 Education Lane, Hyderabad, Telangana 500001, India',
    });
    await client.patch('siteSettings').set({
      whatsappNumber: '919652745858',
      websiteTitle: 'Claret Publications',
      contactEmail: 'info@claretpublications.com',
      contactPhone: '9652745858',
    }).commit();
    console.log('✅ Site settings created/updated');
    
    const settings = await client.fetch('*[_type == "siteSettings"][0]');
    console.log(`   WhatsApp: ${settings.whatsappNumber}`);
    console.log(`   Title: ${settings.websiteTitle}`);
  } catch (error) {
    console.error('❌ Settings failed:', error.message);
  }

  // ====== TEST 7: DELETE THE TEST BOOK ======
  console.log('');
  console.log('--- TEST 7: DELETE BOOK ---');
  try {
    await client.delete(bookId);
    console.log(`✅ Book ${bookId} deleted`);
    
    const check = await client.fetch('*[_type == "book" && _id == $id][0]', { id: bookId });
    console.log(`   Verify deleted: ${check ? '❌ STILL EXISTS' : '✅ GONE'}`);
  } catch (error) {
    console.error('❌ Delete failed:', error.message);
  }

  console.log('');
  console.log('=== ALL TESTS COMPLETE ===');
}

fullTest().catch(console.error);
