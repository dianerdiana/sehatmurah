import mongoose from 'mongoose';

import { DoctorApprovalStatus } from '../../common/enums/doctor-approval-status.enum';
import { connectDatabase } from '../../config/database';
import { DoctorProfileModel } from '../../models/doctor-profile.model';

const runMigration = async (): Promise<void> => {
  try {
    console.log('Starting doctor approval status migration...');

    await connectDatabase();

    const result = await DoctorProfileModel.updateMany(
      {
        $or: [{ approvalStatus: { $exists: false } }, { approvalStatus: null }],
      },
      {
        $set: {
          approvalStatus: DoctorApprovalStatus.APPROVED,
        },
        $unset: {
          approvedAt: 1,
          approvedBy: 1,
          rejectedAt: 1,
          rejectedBy: 1,
          rejectionReason: 1,
        },
      },
    );

    console.log(
      `Migration complete. Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`,
    );
  } catch (error) {
    console.error('Migration failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

void runMigration();
