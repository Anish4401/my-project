const { PrismaClient } = require("@prisma/client");

const prismaClientSingleton = () => {
  return new PrismaClient();
};

global.prismaGlobal = global.prismaGlobal || prismaClientSingleton();

const prisma = global.prismaGlobal;

module.exports = prisma;

if (process.env.NODE_ENV !== "production") {
  global.prismaGlobal = prisma;
}

// so here we are just checking that if prisma in on production if then it will retrun client else 
// it will move to global .