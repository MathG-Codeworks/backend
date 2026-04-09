import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Role } from '../src/common/enums/role.enum';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.attemp.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.option.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.step.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.exercise.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.session.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.ranking.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.refreshToken.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.user.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.role.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.round.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.match.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.minigame.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.category.deleteMany();

	// Crear roles
	const studentRole = await prisma.role.create({
		data: {
			name: Role.STUDENT,
		},
	});

	const adminRole = await prisma.role.create({
		data: {
			name: Role.ADMIN,
		},
	});

	// Crear categoría
	const category = await prisma.category.create({
		data: {
			name: 'Despeje de Variables',
		},
	});

	const minigame = await prisma.minigame.create({
		data: {
			name: 'Brinca brinca',
			description: 'Salta entre plataformas para escoger la opción correcta antes de que se acabe el tiempo',
			categoryId: category.id,
		},
	});

	const excercise = await prisma.exercise.create({
		data: {
			operation: '2x + 3 = 7',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 3 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '2x = 4', isCorrect: true },
								{ result: '2 + 3 = 7 + x', isCorrect: false },
								{ result: '2x + 3 + 7 = 0', isCorrect: false },
								{ result: '2x = 0', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 2',
						options: {
							create: [
								{ result: 'x = 2', isCorrect: true },
								{ result: 'x = 4', isCorrect: false },
								{ result: 'x = 1', isCorrect: false },
								{ result: 'x = 0', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});

	console.log('Exercise created:', excercise);

	// Ejercicio 2: 3x - 5 = 10
	const exercise2 = await prisma.exercise.create({
		data: {
			operation: '3x - 5 = 10',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -5 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '3x = 15', isCorrect: true },
								{ result: '3x = 5', isCorrect: false },
								{ result: 'x - 5 = 10', isCorrect: false },
								{ result: '3x = 10', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 3',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 15', isCorrect: false },
								{ result: 'x = 3', isCorrect: false },
								{ result: 'x = 12', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise2);

	// Ejercicio 3: 4x + 8 = 20
	const exercise3 = await prisma.exercise.create({
		data: {
			operation: '4x + 8 = 20',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 8 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '4x = 12', isCorrect: true },
								{ result: '4x = 28', isCorrect: false },
								{ result: '4x + 20 = 8', isCorrect: false },
								{ result: '4x = 8', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 4',
						options: {
							create: [
								{ result: 'x = 3', isCorrect: true },
								{ result: 'x = 8', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
								{ result: 'x = 12', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise3);

	// Ejercicio 4: 5x - 2 = 23
	const exercise4 = await prisma.exercise.create({
		data: {
			operation: '5x - 2 = 23',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -2 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '5x = 25', isCorrect: true },
								{ result: '5x = 21', isCorrect: false },
								{ result: '5x = 23', isCorrect: false },
								{ result: '5x - 23 = 2', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 5',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 25', isCorrect: false },
								{ result: 'x = 20', isCorrect: false },
								{ result: 'x = 10', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise4);

	// Ejercicio 5: 6x + 1 = 43
	const exercise5 = await prisma.exercise.create({
		data: {
			operation: '6x + 1 = 43',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 1 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '6x = 42', isCorrect: true },
								{ result: '6x = 44', isCorrect: false },
								{ result: '6x = 43', isCorrect: false },
								{ result: '6x + 43 = 1', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 6',
						options: {
							create: [
								{ result: 'x = 7', isCorrect: true },
								{ result: 'x = 6', isCorrect: false },
								{ result: 'x = 42', isCorrect: false },
								{ result: 'x = 36', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise5);

	// Ejercicio 6: 7x - 4 = 10
	const exercise6 = await prisma.exercise.create({
		data: {
			operation: '7x - 4 = 10',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -4 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '7x = 14', isCorrect: true },
								{ result: '7x = 6', isCorrect: false },
								{ result: '7x = 10', isCorrect: false },
								{ result: '7x - 10 = 4', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 7',
						options: {
							create: [
								{ result: 'x = 2', isCorrect: true },
								{ result: 'x = 7', isCorrect: false },
								{ result: 'x = 14', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise6);

	// Ejercicio 7: 2x + 10 = 18
	const exercise7 = await prisma.exercise.create({
		data: {
			operation: '2x + 10 = 18',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 10 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '2x = 8', isCorrect: true },
								{ result: '2x = 28', isCorrect: false },
								{ result: '2x = 18', isCorrect: false },
								{ result: '2x + 18 = 10', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 2',
						options: {
							create: [
								{ result: 'x = 4', isCorrect: true },
								{ result: 'x = 8', isCorrect: false },
								{ result: 'x = 2', isCorrect: false },
								{ result: 'x = 6', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise7);

	// Ejercicio 8: 3x + 9 = 30
	const exercise8 = await prisma.exercise.create({
		data: {
			operation: '3x + 9 = 30',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 9 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '3x = 21', isCorrect: true },
								{ result: '3x = 39', isCorrect: false },
								{ result: '3x = 30', isCorrect: false },
								{ result: '3x + 30 = 9', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 3',
						options: {
							create: [
								{ result: 'x = 7', isCorrect: true },
								{ result: 'x = 21', isCorrect: false },
								{ result: 'x = 3', isCorrect: false },
								{ result: 'x = 10', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise8);

	// Ejercicio 9: 4x - 12 = 24
	const exercise9 = await prisma.exercise.create({
		data: {
			operation: '4x - 12 = 24',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -12 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '4x = 36', isCorrect: true },
								{ result: '4x = 12', isCorrect: false },
								{ result: '4x = 24', isCorrect: false },
								{ result: '4x - 24 = 12', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 4',
						options: {
							create: [
								{ result: 'x = 9', isCorrect: true },
								{ result: 'x = 36', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
								{ result: 'x = 8', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise9);

	// Ejercicio 10: 8x + 5 = 45
	const exercise10 = await prisma.exercise.create({
		data: {
			operation: '8x + 5 = 45',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 5 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '8x = 40', isCorrect: true },
								{ result: '8x = 50', isCorrect: false },
								{ result: '8x = 45', isCorrect: false },
								{ result: '8x + 45 = 5', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 8',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 40', isCorrect: false },
								{ result: 'x = 8', isCorrect: false },
								{ result: 'x = 32', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise10);

	// Crear usuario de prueba
	const testUser = await prisma.user.create({
		data: {
			username: 'testuser',
			email: 'test@example.com',
			password: '$2b$10$hashedpassword123456', // Esto es un placeholder
			roleId: studentRole.id,
		},
	});
	console.log('Test user created:', testUser);

	// Crear sesiones para el usuario - semana con hueco el sábado
	// Calcular fechas relativas: viernes, sábado (hueco), domingo
	
	const today = new Date();
	const dayOfWeek = today.getDay(); // 0 = domingo, 5 = viernes, 6 = sábado
	
	// Calcular viernes de la semana pasada
	let friday = new Date(today);
	friday.setDate(friday.getDate() - (dayOfWeek + 2 % 7)); // Retroceso a viernes
	if (dayOfWeek <= 5) friday.setDate(friday.getDate() - 7); // Si aún no es viernes esta semana, ir al viernes pasado
	
	// Calcular sábado y domingo
	const saturday = new Date(friday);
	saturday.setDate(saturday.getDate() + 1);
	
	const sunday = new Date(friday);
	sunday.setDate(sunday.getDate() + 2);
	
	// Sesión viernes
	const sessionFriday1 = await prisma.session.create({
		data: {
			userId: testUser.id,
			start: new Date(friday.getTime() + 8 * 3600000), // 08:00 AM
			end: new Date(friday.getTime() + 10 * 3600000), // 10:00 AM
			platform: 'Web',
			device: 'Chrome on Windows',
		},
	});
	console.log('Session Friday 1 created:', sessionFriday1);

	const sessionFriday2 = await prisma.session.create({
		data: {
			userId: testUser.id,
			start: new Date(friday.getTime() + 14 * 3600000), // 14:00 (2:00 PM)
			end: new Date(friday.getTime() + 16 * 3600000), // 16:00 (4:00 PM)
			platform: 'Mobile',
			device: 'Safari on iOS',
		},
	});
	console.log('Session Friday 2 created:', sessionFriday2);

	const sessionFriday3 = await prisma.session.create({
		data: {
			userId: testUser.id,
			start: new Date(friday.getTime() + 20 * 3600000), // 20:00 (8:00 PM)
			end: new Date(friday.getTime() + 21.5 * 3600000), // 21:30 (9:30 PM)
			platform: 'Mobile',
			device: 'Chrome on Android',
		},
	});
	console.log('Session Friday 3 created:', sessionFriday3);

	// NO hay sesión el sábado (hueco)
	console.log('Saturday - No sessions (gap day)');

	// Sesiones domingo
	const sessionSunday1 = await prisma.session.create({
		data: {
			userId: testUser.id,
			start: new Date(sunday.getTime() + 9 * 3600000), // 09:00 AM
			end: new Date(sunday.getTime() + 11 * 3600000), // 11:00 AM
			platform: 'Web',
			device: 'Firefox on Windows',
		},
	});
	console.log('Session Sunday 1 created:', sessionSunday1);

	const sessionSunday2 = await prisma.session.create({
		data: {
			userId: testUser.id,
			start: new Date(sunday.getTime() + 15 * 3600000), // 15:00 (3:00 PM)
			end: new Date(sunday.getTime() + 17 * 3600000), // 17:00 (5:00 PM)
			platform: 'Web',
			device: 'Edge on Windows',
		},
	});
	console.log('Session Sunday 2 created:', sessionSunday2);

	// Variables para attempts y rounds
	const twoDaysAgo = new Date(friday);
	const yesterday = new Date(saturday);
	// today se mantendrá como today para today

	// Crear match para poder crear rounds
	const match = await prisma.match.create({
		data: {
			id: 'match_' + Math.random().toString(36).substring(7),
			code: 'TEST' + Math.floor(Math.random() * 10000),
		},
	});
	console.log('Match created:', match);

	// Agregar usuario al match
	await prisma.userMatch.create({
		data: {
			userId: testUser.id,
			matchId: match.id,
		},
	});
	console.log('User added to match');

	// Crear attempts variados y aleatorios con diferentes fechas para probar agrupamiento por día
	const exercises = [excercise, exercise2, exercise3, exercise4, exercise5, exercise6, exercise7, exercise8, exercise9, exercise10];
	
	// Función auxiliar para crear attemps con fecha específica
	const createAttempsBatch = async (baseDate: Date, count: number, dayLabel: string) => {
		for (let i = 0; i < count; i++) {
			const exercise = exercises[Math.floor(Math.random() * exercises.length)];
			const steps = await prisma.step.findMany({
				where: { exerciseId: exercise.id },
				include: { options: true },
			});

			if (steps.length > 0) {
				const step = steps[Math.floor(Math.random() * steps.length)];
				const option = step.options[Math.floor(Math.random() * step.options.length)];
				const isCorrect = Math.random() > 0.3; // 70% correcta, 30% incorrecta
				
				await prisma.attemp.create({
					data: {
						isCorrect,
						number: i + 1,
						userId: testUser.id,
						exerciseId: exercise.id,
						optionId: option.id,
						createdAt: new Date(baseDate.getTime() + i * Math.random() * 3600000),
					},
				});
			}
		}
		console.log(`${count} attempts created for ${dayLabel}`);
	};

	// Crear attempts para cada día
	await createAttempsBatch(twoDaysAgo, 12, '2 days ago');
	await createAttempsBatch(yesterday, 15, 'yesterday');
	await createAttempsBatch(today, 18, 'today');

	// Crear rounds para el usuario
	const round1 = await prisma.round.create({
		data: {
			matchId: match.id,
			minigameId: minigame.id,
			createdAt: twoDaysAgo,
		},
	});
	console.log('Round 1 created:', round1);

	const round2 = await prisma.round.create({
		data: {
			matchId: match.id,
			minigameId: minigame.id,
			createdAt: yesterday,
		},
	});
	console.log('Round 2 created:', round2);

	const round3 = await prisma.round.create({
		data: {
			matchId: match.id,
			minigameId: minigame.id,
			createdAt: today,
		},
	});
	console.log('Round 3 created:', round3);

	// Crear rankings para cada round
	const ranking1 = await prisma.ranking.create({
		data: {
			userId: testUser.id,
			roundId: round1.id,
			score: 85.5,
			accuracy: 85,
			position: 3,
		},
	});
	console.log('Ranking 1 created:', ranking1);

	const ranking2 = await prisma.ranking.create({
		data: {
			userId: testUser.id,
			roundId: round2.id,
			score: 92.3,
			accuracy: 92,
			position: 1,
		},
	});
	console.log('Ranking 2 created:', ranking2);

	const ranking3 = await prisma.ranking.create({
		data: {
			userId: testUser.id,
			roundId: round3.id,
			score: 78.9,
			accuracy: 78,
			position: 1,
		},
	});
	console.log('Ranking 3 created:', ranking3);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
