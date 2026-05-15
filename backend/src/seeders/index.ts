/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

import { UserRole } from '../common/enums/user-role.enum';
import { connectDatabase } from '../config/database';
import { AppointmentModel } from '../models/appointment.model';
import { DoctorProfileModel } from '../models/doctor-profile.model';
import { PatientProfileModel } from '../models/patient-profile.model';
import { ReviewModel } from '../models/review.model';
import { SpecialistModel } from '../models/specialist.model';
import { UserModel } from '../models/user.model';

import { generateAppointments } from './factories/appointment.factory';
import { generateDoctorProfiles } from './factories/doctor-profile.factory';
import { generatePatientProfiles } from './factories/patient-profile.factory';
import { generateReviews } from './factories/review.factory';
import { generateSpecialists } from './factories/specialist.factory';
import { generateUsers } from './factories/user.factory';

interface SeedingStats {
  specialists: number;
  users: number;
  doctorProfiles: number;
  patientProfiles: number;
  appointments: number;
  reviews: number;
}

class SeederRunner {
  private stats: SeedingStats = {
    specialists: 0,
    users: 0,
    doctorProfiles: 0,
    patientProfiles: 0,
    appointments: 0,
    reviews: 0,
  };

  private shouldReset: boolean = false;

  constructor() {
    this.shouldReset = process.argv.includes('--reset') || process.argv.includes('--clear');
  }

  async run(): Promise<void> {
    try {
      console.log('🌱 Seeder started...\n');

      // Connect to database
      console.log('📡 Connecting to database...');
      await connectDatabase();
      console.log('✅ Connected to database\n');

      // Clear database if reset flag is provided
      if (this.shouldReset) {
        console.log('🗑️  Clearing database...');
        await this.clearDatabase();
        console.log('✅ Database cleared\n');
      }

      // Step 1: Seed Specialists
      console.log('📚 Seeding Specialists...');
      const specialists = await this.seedSpecialists();
      const specialistIds = specialists.map((s) => s._id);
      console.log(`✅ Created ${this.stats.specialists} specialists\n`);

      // Step 2: Seed Users (DOCTOR and PATIENT)
      console.log('👥 Seeding Users...');
      const users = await this.seedUsers();
      const doctorUsers = users.filter((u) => u.role === UserRole.DOCTOR);
      const patientUsers = users.filter((u) => u.role === UserRole.PATIENT);
      const doctorUserIds = doctorUsers.map((u) => u._id);
      const patientUserIds = patientUsers.map((u) => u._id);
      console.log(
        `✅ Created ${this.stats.users} users (${doctorUsers.length} doctors, ${patientUsers.length} patients)\n`,
      );

      // Step 3: Seed Doctor Profiles
      console.log('👨‍⚕️  Seeding Doctor Profiles...');
      const doctorProfiles = await this.seedDoctorProfiles(doctorUserIds, specialistIds);
      const doctorProfileIds = doctorProfiles.map((dp) => dp._id);
      console.log(`✅ Created ${this.stats.doctorProfiles} doctor profiles\n`);

      // Step 4: Seed Patient Profiles
      console.log('🤝 Seeding Patient Profiles...');
      const patientProfiles = await this.seedPatientProfiles(patientUserIds);
      const patientProfileIds = patientProfiles.map((pp) => pp._id);
      console.log(`✅ Created ${this.stats.patientProfiles} patient profiles\n`);

      // Step 5: Seed Appointments
      console.log('📅 Seeding Appointments...');
      const appointments = await this.seedAppointments(patientProfileIds, doctorProfileIds);
      const appointmentIds = appointments.map((a) => a._id);
      console.log(`✅ Created ${this.stats.appointments} appointments\n`);

      // Step 6: Seed Reviews
      console.log('⭐ Seeding Reviews...');
      await this.seedReviews(patientProfileIds, doctorProfileIds, appointmentIds);
      console.log(`✅ Created ${this.stats.reviews} reviews\n`);

      // Display summary
      this.displaySummary();

      // Close database connection
      await mongoose.connection.close();
      console.log('✅ Database connection closed\n');
      console.log('🎉 Seeding completed successfully!');
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      await mongoose.connection.close();
      process.exit(1);
    }
  }

  private async clearDatabase(): Promise<void> {
    const collections = [
      ReviewModel,
      AppointmentModel,
      DoctorProfileModel,
      PatientProfileModel,
      UserModel,
      SpecialistModel,
    ];

    for (const model of collections) {
      await (model as any).deleteMany({});
    }
  }

  private async seedSpecialists() {
    const specialistData = generateSpecialists();
    const specialists = await SpecialistModel.insertMany(specialistData);
    this.stats.specialists = specialists.length;
    return specialists;
  }

  private async seedUsers() {
    const userData = await generateUsers();
    const users = await UserModel.insertMany(userData);
    this.stats.users = users.length;
    return users;
  }

  private async seedDoctorProfiles(doctorUserIds: any[], specialistIds: any[]) {
    const doctorProfileData = generateDoctorProfiles(doctorUserIds, specialistIds);
    const doctorProfiles = await DoctorProfileModel.insertMany(doctorProfileData);
    this.stats.doctorProfiles = doctorProfiles.length;
    return doctorProfiles;
  }

  private async seedPatientProfiles(patientUserIds: any[]) {
    const patientProfileData = generatePatientProfiles(patientUserIds);
    const patientProfiles = await PatientProfileModel.insertMany(patientProfileData);
    this.stats.patientProfiles = patientProfiles.length;
    return patientProfiles;
  }

  private async seedAppointments(patientProfileIds: any[], doctorProfileIds: any[]) {
    const appointmentData = generateAppointments(patientProfileIds, doctorProfileIds);
    const appointments = await AppointmentModel.insertMany(appointmentData);
    this.stats.appointments = appointments.length;
    return appointments;
  }

  private async seedReviews(
    patientProfileIds: any[],
    doctorProfileIds: any[],
    appointmentIds: any[],
  ) {
    const reviewData = generateReviews(patientProfileIds, doctorProfileIds, appointmentIds);
    const reviews = await ReviewModel.insertMany(reviewData);
    this.stats.reviews = reviews.length;
    return reviews;
  }

  private displaySummary(): void {
    console.log('\n📊 Seeding Summary:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`Specialists:      ${this.stats.specialists}`);
    console.log(`Users:            ${this.stats.users}`);
    console.log(`Doctor Profiles:  ${this.stats.doctorProfiles}`);
    console.log(`Patient Profiles: ${this.stats.patientProfiles}`);
    console.log(`Appointments:     ${this.stats.appointments}`);
    console.log(`Reviews:          ${this.stats.reviews}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    if (this.shouldReset) {
      console.log('💡 Note: Database was reset before seeding\n');
    } else {
      console.log('💡 Note: New data was appended to existing database\n');
    }
  }
}

// Run seeder
const seeder = new SeederRunner();
seeder.run();
