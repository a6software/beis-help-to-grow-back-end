import express from 'express';
import validateCyberSecurityRouter from './validate-cyber-security';
import validateAccessibilityRouter from './validate-accessibility';
import validateOnlinePurchaseRouter from './validate-online-purchase';
import validateCategoryRouter from './validate-category';
import validatemakingTaxDigitalRouter from './validate-making-tax-digital';
import validateMtdWarningRouter from './validate-mtd-warning';
import validateRatingsRouter from './validate-ratings';
import validateEligibilityCompleteRouter from './validate-eligibility-complete';
import validateGdprRouter from './validate-gdpr';
import validatePhysicalMediaRouter from './validate-physical-media';

const router = express.Router();

router.use('/validate-accessibility', validateAccessibilityRouter);
router.use('/validate-cyber-security', validateCyberSecurityRouter);
router.use('/validate-online-purchase', validateOnlinePurchaseRouter);
router.use('/validate-category', validateCategoryRouter);
router.use('/validate-making-tax-digital', validatemakingTaxDigitalRouter);
router.use('/validate-mtd-warning', validateMtdWarningRouter);
router.use('/validate-ratings', validateRatingsRouter);
router.use('/validate-eligibility-complete', validateEligibilityCompleteRouter);
router.use('/validate-gdpr', validateGdprRouter);
router.use('/validate-physical-media', validatePhysicalMediaRouter);
export default router;
