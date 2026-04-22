import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    // ============================================
    // 1. USERS
    // ============================================
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password123', 10);
    const hashedPassword3 = await bcrypt.hash('password123', 10);

    const user1 = await prisma.user.create({
        data: {
            name: 'Alice Johnson',
            email: 'alice@example.com',
            password: hashedPassword1,
            role: 'editor',
            status: 'active',
        },
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Bob Smith',
            email: 'bob@example.com',
            password: hashedPassword2,
            role: 'viewer',
            status: 'active',
        },
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Carol Chen',
            email: 'carol@example.com',
            password: hashedPassword3,
            role: 'admin',
            status: 'active',
        },
    });

    console.log(`✅ Created 3 users`);

    // ============================================
    // 2. ITINERARIES
    // ============================================
    const itinerary1 = await prisma.itinerary.create({
        data: {
            userId: user1.id,
            title: 'Paris Summer 2024',
            description: 'A romantic week exploring the City of Light',
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-08'),
            shareToken: 'paris-2024-abc123',
        },
    });

    const itinerary2 = await prisma.itinerary.create({
        data: {
            userId: user1.id,
            title: 'Tokyo Adventure',
            description: 'Exploring modern and traditional Japan',
            startDate: new Date('2024-07-15'),
            endDate: new Date('2024-08-01'),
            shareToken: 'tokyo-2024-xyz789',
        },
    });

    const itinerary3 = await prisma.itinerary.create({
        data: {
            userId: user2.id,
            title: 'Barcelona Beach Getaway',
            description: 'Sun, sea, and tapas in beautiful Barcelona',
            startDate: new Date('2024-08-10'),
            endDate: new Date('2024-08-17'),
            shareToken: 'barcelona-2024-def456',
        },
    });

    const itinerary4 = await prisma.itinerary.create({
        data: {
            userId: user3.id,
            title: 'New York City Walk',
            description: 'The city that never sleeps',
            startDate: new Date('2024-09-01'),
            endDate: new Date('2024-09-07'),
            shareToken: 'nyc-2024-ghi789',
        },
    });

    console.log(`✅ Created 4 itineraries`);

    // ============================================
    // 3. LEGS (Étapes du voyage Paris)
    // ============================================
    const legs_paris = [
        {
            title: 'Eiffel Tower',
            description: 'Visit the iconic Eiffel Tower, climb to the top for stunning city views',
            latitude: 48.8584,
            longitude: 2.2945,
            duration: 180,
            order: 1,
        },
        {
            title: 'Louvre Museum',
            description: 'World\'s largest art museum, home to the Mona Lisa and Venus de Milo',
            latitude: 48.8606,
            longitude: 2.3352,
            duration: 240,
            order: 2,
        },
        {
            title: 'Notre-Dame Cathedral',
            description: 'Stunning Gothic architecture and historical significance',
            latitude: 48.8530,
            longitude: 2.3499,
            duration: 120,
            order: 3,
        },
        {
            title: 'Arc de Triomphe',
            description: 'Monumental arch honouring those who fought for France',
            latitude: 48.8738,
            longitude: 2.2950,
            duration: 90,
            order: 4,
        },
        {
            title: 'Champs-Élysées',
            description: 'Famous avenue with shops, cafes, and nightlife',
            latitude: 48.8698,
            longitude: 2.3076,
            duration: 120,
            order: 5,
        },
    ];

    for (const leg of legs_paris) {
        await prisma.leg.create({
            data: {
                itineraryId: itinerary1.id,
                title: leg.title,
                description: leg.description,
                latitude: leg.latitude,
                longitude: leg.longitude,
                duration: leg.duration,
                order: leg.order,
            },
        });
    }

    console.log(`✅ Created ${legs_paris.length} legs for Paris`);

    // ============================================
    // 4. LEGS (Étapes du voyage Tokyo)
    // ============================================
    const legs_tokyo = [
        {
            title: 'Senso-ji Temple',
            description: 'Tokyo\'s oldest temple, stunning red lantern and traditional architecture',
            latitude: 35.7148,
            longitude: 139.7967,
            duration: 120,
            order: 1,
        },
        {
            title: 'Shibuya Crossing',
            description: 'World\'s busiest pedestrian crossing, iconic and vibrant',
            latitude: 35.6595,
            longitude: 139.7004,
            duration: 60,
            order: 2,
        },
        {
            title: 'Meiji Shrine',
            description: 'Peaceful Shinto shrine surrounded by forests',
            latitude: 35.6764,
            longitude: 139.7011,
            duration: 90,
            order: 3,
        },
        {
            title: 'Tsukiji Fish Market',
            description: 'Experience fresh sushi and Japanese street food culture',
            latitude: 35.6647,
            longitude: 139.7761,
            duration: 120,
            order: 4,
        },
        {
            title: 'TeamLab Borderless',
            description: 'Mind-bending digital art museum with immersive installations',
            latitude: 35.6295,
            longitude: 139.6893,
            duration: 180,
            order: 5,
        },
        {
            title: 'Akihabara Electronics District',
            description: 'Tech paradise with anime, manga, and electronics shops',
            latitude: 35.6987,
            longitude: 139.7745,
            duration: 150,
            order: 6,
        },
    ];

    for (const leg of legs_tokyo) {
        await prisma.leg.create({
            data: {
                itineraryId: itinerary2.id,
                title: leg.title,
                description: leg.description,
                latitude: leg.latitude,
                longitude: leg.longitude,
                duration: leg.duration,
                order: leg.order,
            },
        });
    }

    console.log(`✅ Created ${legs_tokyo.length} legs for Tokyo`);

    // ============================================
    // 5. LEGS (Étapes du voyage Barcelona)
    // ============================================
    const legs_barcelona = [
        {
            title: 'Sagrada Família',
            description: 'Gaudí\'s masterpiece basilica, a UNESCO World Heritage site',
            latitude: 41.4036,
            longitude: 2.1744,
            duration: 180,
            order: 1,
        },
        {
            title: 'Park Güell',
            description: 'Whimsical park with colorful mosaics and panoramic city views',
            latitude: 41.4145,
            longitude: 2.1520,
            duration: 150,
            order: 2,
        },
        {
            title: 'Gothic Quarter',
            description: 'Medieval streets, Barcelona Cathedral, and historic atmosphere',
            latitude: 41.3851,
            longitude: 2.1734,
            duration: 120,
            order: 3,
        },
        {
            title: 'La Rambla',
            description: 'Famous tree-lined boulevard with street performers and cafes',
            latitude: 41.3809,
            longitude: 2.1705,
            duration: 90,
            order: 4,
        },
        {
            title: 'Barcelona Beach',
            description: 'Relax on golden sand, swim, and enjoy beachfront restaurants',
            latitude: 41.3874,
            longitude: 2.1898,
            duration: 180,
            order: 5,
        },
    ];

    for (const leg of legs_barcelona) {
        await prisma.leg.create({
            data: {
                itineraryId: itinerary3.id,
                title: leg.title,
                description: leg.description,
                latitude: leg.latitude,
                longitude: leg.longitude,
                duration: leg.duration,
                order: leg.order,
            },
        });
    }

    console.log(`✅ Created ${legs_barcelona.length} legs for Barcelona`);

    // ============================================
    // 6. LEGS (Étapes du voyage NYC)
    // ============================================
    const legs_nyc = [
        {
            title: 'Statue of Liberty',
            description: 'Iconic symbol of freedom, accessible by ferry from Battery Park',
            latitude: 40.6892,
            longitude: -74.0445,
            duration: 180,
            order: 1,
        },
        {
            title: 'Central Park',
            description: 'Massive urban park perfect for walking, picnicking, and people-watching',
            latitude: 40.7829,
            longitude: -73.9654,
            duration: 180,
            order: 2,
        },
        {
            title: 'Times Square',
            description: 'Bright lights, billboards, and non-stop energy in the heart of Manhattan',
            latitude: 40.7580,
            longitude: -73.9855,
            duration: 120,
            order: 3,
        },
        {
            title: 'Empire State Building',
            description: 'Climb to the 86th floor for breathtaking 360° city views',
            latitude: 40.7484,
            longitude: -73.9857,
            duration: 120,
            order: 4,
        },
        {
            title: 'Brooklyn Bridge',
            description: 'Walk the iconic bridge for stunning views of Manhattan and East River',
            latitude: 40.7061,
            longitude: -73.9969,
            duration: 90,
            order: 5,
        },
    ];

    for (const leg of legs_nyc) {
        await prisma.leg.create({
            data: {
                itineraryId: itinerary4.id,
                title: leg.title,
                description: leg.description,
                latitude: leg.latitude,
                longitude: leg.longitude,
                duration: leg.duration,
                order: leg.order,
            },
        });
    }

    console.log(`✅ Created ${legs_nyc.length} legs for NYC`);

    // ============================================
    // 7. REFRESH TOKENS (Optional)
    // ============================================
    await prisma.refreshToken.create({
        data: {
            userId: user1.id,
            token: 'refresh_token_alice_1',
            status: 'active',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    await prisma.refreshToken.create({
        data: {
            userId: user2.id,
            token: 'refresh_token_bob_1',
            status: 'active',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });

    console.log(`✅ Created refresh tokens`);

    console.log('\n🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });