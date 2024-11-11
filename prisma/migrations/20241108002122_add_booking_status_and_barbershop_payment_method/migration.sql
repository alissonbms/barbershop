-- CreateEnum
CREATE TYPE "BarbershopPaymentMethod" AS ENUM ('ON_LOCATION', 'IN_ADVANCE');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('WAITING_FOR_PAYMENT', 'BOOKING_CONFIRMED');

-- AlterTable
ALTER TABLE "Barbershop" ADD COLUMN     "paymentMethod" "BarbershopPaymentMethod" NOT NULL DEFAULT 'ON_LOCATION';

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'WAITING_FOR_PAYMENT';
