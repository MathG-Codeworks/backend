import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Role } from '../src/common/enums/role.enum';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.option.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.step.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.exercise.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.category.deleteMany();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	await prisma.role.deleteMany();

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
