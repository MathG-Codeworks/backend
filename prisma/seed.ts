import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import { Role } from '../src/common/enums/role.enum';
import * as bcrypt from 'bcrypt';

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
	await prisma.userMatch.deleteMany();
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

	// Ejercicio 11: 9x - 3 = 24
	const exercise11 = await prisma.exercise.create({
		data: {
			operation: '9x - 3 = 24',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -3 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '9x = 27', isCorrect: true },
								{ result: '9x = 21', isCorrect: false },
								{ result: '9x = 24', isCorrect: false },
								{ result: '9x - 24 = 3', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 9',
						options: {
							create: [
								{ result: 'x = 3', isCorrect: true },
								{ result: 'x = 9', isCorrect: false },
								{ result: 'x = 27', isCorrect: false },
								{ result: 'x = 6', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise11);

	// Ejercicio 12: 5x + 7 = 32
	const exercise12 = await prisma.exercise.create({
		data: {
			operation: '5x + 7 = 32',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 7 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '5x = 25', isCorrect: true },
								{ result: '5x = 39', isCorrect: false },
								{ result: '5x = 32', isCorrect: false },
								{ result: '5x + 32 = 7', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 5',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 25', isCorrect: false },
								{ result: 'x = 7', isCorrect: false },
								{ result: 'x = 10', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise12);

	// Ejercicio 13: 6x - 6 = 18
	const exercise13 = await prisma.exercise.create({
		data: {
			operation: '6x - 6 = 18',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -6 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '6x = 24', isCorrect: true },
								{ result: '6x = 12', isCorrect: false },
								{ result: '6x = 18', isCorrect: false },
								{ result: '6x - 18 = 6', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 6',
						options: {
							create: [
								{ result: 'x = 4', isCorrect: true },
								{ result: 'x = 6', isCorrect: false },
								{ result: 'x = 24', isCorrect: false },
								{ result: 'x = 3', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise13);

	// Ejercicio 14: 10x + 4 = 54
	const exercise14 = await prisma.exercise.create({
		data: {
			operation: '10x + 4 = 54',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 4 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '10x = 50', isCorrect: true },
								{ result: '10x = 58', isCorrect: false },
								{ result: '10x = 54', isCorrect: false },
								{ result: '10x + 54 = 4', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 10',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 50', isCorrect: false },
								{ result: 'x = 10', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise14);

	// Ejercicio 15: 3x - 9 = 12
	const exercise15 = await prisma.exercise.create({
		data: {
			operation: '3x - 9 = 12',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -9 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '3x = 21', isCorrect: true },
								{ result: '3x = 3', isCorrect: false },
								{ result: '3x = 12', isCorrect: false },
								{ result: '3x - 12 = 9', isCorrect: false },
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
								{ result: 'x = 9', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise15);

	// Ejercicio 16: 7x + 6 = 48
	const exercise16 = await prisma.exercise.create({
		data: {
			operation: '7x + 6 = 48',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 6 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '7x = 42', isCorrect: true },
								{ result: '7x = 54', isCorrect: false },
								{ result: '7x = 48', isCorrect: false },
								{ result: '7x + 48 = 6', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 7',
						options: {
							create: [
								{ result: 'x = 6', isCorrect: true },
								{ result: 'x = 42', isCorrect: false },
								{ result: 'x = 7', isCorrect: false },
								{ result: 'x = 8', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise16);

	// Ejercicio 17: 4x - 8 = 16
	const exercise17 = await prisma.exercise.create({
		data: {
			operation: '4x - 8 = 16',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -8 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '4x = 24', isCorrect: true },
								{ result: '4x = 8', isCorrect: false },
								{ result: '4x = 16', isCorrect: false },
								{ result: '4x - 16 = 8', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 4',
						options: {
							create: [
								{ result: 'x = 6', isCorrect: true },
								{ result: 'x = 24', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
								{ result: 'x = 8', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise17);

	// Ejercicio 18: 2x - 14 = 6
	const exercise18 = await prisma.exercise.create({
		data: {
			operation: '2x - 14 = 6',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -14 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '2x = 20', isCorrect: true },
								{ result: '2x = -8', isCorrect: false },
								{ result: '2x = 6', isCorrect: false },
								{ result: '2x - 6 = 14', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 2',
						options: {
							create: [
								{ result: 'x = 10', isCorrect: true },
								{ result: 'x = 20', isCorrect: false },
								{ result: 'x = 2', isCorrect: false },
								{ result: 'x = 7', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise18);

	// Ejercicio 19: 11x + 2 = 35
	const exercise19 = await prisma.exercise.create({
		data: {
			operation: '11x + 2 = 35',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 2 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '11x = 33', isCorrect: true },
								{ result: '11x = 37', isCorrect: false },
								{ result: '11x = 35', isCorrect: false },
								{ result: '11x + 35 = 2', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 11',
						options: {
							create: [
								{ result: 'x = 3', isCorrect: true },
								{ result: 'x = 11', isCorrect: false },
								{ result: 'x = 33', isCorrect: false },
								{ result: 'x = 2', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise19);

	// Ejercicio 20: 8x - 16 = 40
	const exercise20 = await prisma.exercise.create({
		data: {
			operation: '8x - 16 = 40',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -16 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '8x = 56', isCorrect: true },
								{ result: '8x = 24', isCorrect: false },
								{ result: '8x = 40', isCorrect: false },
								{ result: '8x - 40 = 16', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 8',
						options: {
							create: [
								{ result: 'x = 7', isCorrect: true },
								{ result: 'x = 56', isCorrect: false },
								{ result: 'x = 8', isCorrect: false },
								{ result: 'x = 16', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise20);

	// Ejercicio 21: 12x + 3 = 51
	const exercise21 = await prisma.exercise.create({
		data: {
			operation: '12x + 3 = 51',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 3 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '12x = 48', isCorrect: true },
								{ result: '12x = 54', isCorrect: false },
								{ result: '12x = 51', isCorrect: false },
								{ result: '12x + 51 = 3', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 12',
						options: {
							create: [
								{ result: 'x = 4', isCorrect: true },
								{ result: 'x = 48', isCorrect: false },
								{ result: 'x = 12', isCorrect: false },
								{ result: 'x = 3', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise21);

	// Ejercicio 22: 5x - 15 = 20
	const exercise22 = await prisma.exercise.create({
		data: {
			operation: '5x - 15 = 20',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -15 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '5x = 35', isCorrect: true },
								{ result: '5x = 5', isCorrect: false },
								{ result: '5x = 20', isCorrect: false },
								{ result: '5x - 20 = 15', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 5',
						options: {
							create: [
								{ result: 'x = 7', isCorrect: true },
								{ result: 'x = 35', isCorrect: false },
								{ result: 'x = 5', isCorrect: false },
								{ result: 'x = 15', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise22);

	// Ejercicio 23: 9x + 9 = 63
	const exercise23 = await prisma.exercise.create({
		data: {
			operation: '9x + 9 = 63',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 9 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '9x = 54', isCorrect: true },
								{ result: '9x = 72', isCorrect: false },
								{ result: '9x = 63', isCorrect: false },
								{ result: '9x + 63 = 9', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 9',
						options: {
							create: [
								{ result: 'x = 6', isCorrect: true },
								{ result: 'x = 54', isCorrect: false },
								{ result: 'x = 9', isCorrect: false },
								{ result: 'x = 7', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise23);

	// Ejercicio 24: 3x + 15 = 36
	const exercise24 = await prisma.exercise.create({
		data: {
			operation: '3x + 15 = 36',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 15 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '3x = 21', isCorrect: true },
								{ result: '3x = 51', isCorrect: false },
								{ result: '3x = 36', isCorrect: false },
								{ result: '3x + 36 = 15', isCorrect: false },
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
								{ result: 'x = 15', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise24);

	// Ejercicio 25: 6x - 18 = 12
	const exercise25 = await prisma.exercise.create({
		data: {
			operation: '6x - 18 = 12',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -18 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '6x = 30', isCorrect: true },
								{ result: '6x = -6', isCorrect: false },
								{ result: '6x = 12', isCorrect: false },
								{ result: '6x - 12 = 18', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 6',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 30', isCorrect: false },
								{ result: 'x = 6', isCorrect: false },
								{ result: 'x = 18', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise25);

	// Ejercicio 26: 2x + 16 = 30
	const exercise26 = await prisma.exercise.create({
		data: {
			operation: '2x + 16 = 30',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 16 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '2x = 14', isCorrect: true },
								{ result: '2x = 46', isCorrect: false },
								{ result: '2x = 30', isCorrect: false },
								{ result: '2x + 30 = 16', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 2',
						options: {
							create: [
								{ result: 'x = 7', isCorrect: true },
								{ result: 'x = 14', isCorrect: false },
								{ result: 'x = 2', isCorrect: false },
								{ result: 'x = 16', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise26);

	// Ejercicio 27: 10x - 20 = 60
	const exercise27 = await prisma.exercise.create({
		data: {
			operation: '10x - 20 = 60',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -20 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '10x = 80', isCorrect: true },
								{ result: '10x = 40', isCorrect: false },
								{ result: '10x = 60', isCorrect: false },
								{ result: '10x - 60 = 20', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 10',
						options: {
							create: [
								{ result: 'x = 8', isCorrect: true },
								{ result: 'x = 80', isCorrect: false },
								{ result: 'x = 10', isCorrect: false },
								{ result: 'x = 20', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise27);

	// Ejercicio 28: 4x + 12 = 44
	const exercise28 = await prisma.exercise.create({
		data: {
			operation: '4x + 12 = 44',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el 12 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '4x = 32', isCorrect: true },
								{ result: '4x = 56', isCorrect: false },
								{ result: '4x = 44', isCorrect: false },
								{ result: '4x + 44 = 12', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 4',
						options: {
							create: [
								{ result: 'x = 8', isCorrect: true },
								{ result: 'x = 32', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
								{ result: 'x = 12', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise28);

	// Ejercicio 29: 7x - 14 = 42
	const exercise29 = await prisma.exercise.create({
		data: {
			operation: '7x - 14 = 42',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -14 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '7x = 56', isCorrect: true },
								{ result: '7x = 28', isCorrect: false },
								{ result: '7x = 42', isCorrect: false },
								{ result: '7x - 42 = 14', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 7',
						options: {
							create: [
								{ result: 'x = 8', isCorrect: true },
								{ result: 'x = 56', isCorrect: false },
								{ result: 'x = 7', isCorrect: false },
								{ result: 'x = 14', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise29);

	// Ejercicio 30: 11x - 11 = 44
	const exercise30 = await prisma.exercise.create({
		data: {
			operation: '11x - 11 = 44',
			description: 'Despeja la x en la ecuacion',
			categoryId: category.id,
			steps: {
				create: [
					{
						description: 'Mueve el -11 al otro lado de la ecuacion',
						options: {
							create: [
								{ result: '11x = 55', isCorrect: true },
								{ result: '11x = 33', isCorrect: false },
								{ result: '11x = 44', isCorrect: false },
								{ result: '11x - 44 = 11', isCorrect: false },
							],
						},
					},
					{
						description: 'Despeja la x dividiendo entre 11',
						options: {
							create: [
								{ result: 'x = 5', isCorrect: true },
								{ result: 'x = 55', isCorrect: false },
								{ result: 'x = 11', isCorrect: false },
								{ result: 'x = 4', isCorrect: false },
							],
						},
					},
				],
			},
		},
	});
	console.log('Exercise created:', exercise30);


	// Crear usuario de prueba
	const testUser = await prisma.user.create({
		data: {
			username: 'testuser',
			email: 'test@example.com',
			password: await bcrypt.hash('Testuser12345@', 10),
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
	const exercises = [
		excercise, exercise2, exercise3, exercise4, exercise5,
		exercise6, exercise7, exercise8, exercise9, exercise10,
		exercise11, exercise12, exercise13, exercise14, exercise15,
		exercise16, exercise17, exercise18, exercise19, exercise20,
		exercise21, exercise22, exercise23, exercise24, exercise25,
		exercise26, exercise27, exercise28, exercise29, exercise30,
	];
	
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
