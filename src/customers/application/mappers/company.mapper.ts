import { RucTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/ruc.typeorm';
import { Company } from '../../domain/entities/company.entity';
import { CompanyTypeORM } from '../../infrastructure/persistence/typeorm/entities/company.typeorm';
import { CompanyNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/company-name.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class CompanyMapper {
  public static toTypeORM(company: Company): CompanyTypeORM {
    const companyTypeORM: CompanyTypeORM = new CompanyTypeORM();
    companyTypeORM.companyName = CompanyNameTypeORM.from(company.getName().getValue());
    companyTypeORM.ruc = RucTypeORM.from(company.getRuc().getValue());
    const createdAt: string = company.getAuditTrail() != null && company.getAuditTrail().getCreatedAt() != null ? company.getAuditTrail().getCreatedAt().format() : null;
    const createdBy: number = company.getAuditTrail() != null && company.getAuditTrail().getCreatedBy() != null ? company.getAuditTrail().getCreatedBy().getValue() : null;
    const updatedAt: string = company.getAuditTrail() != null && company.getAuditTrail().getUpdatedAt() != null ? company.getAuditTrail().getUpdatedAt().format() : null;
    const updatedBy: number = company.getAuditTrail() != null && company.getAuditTrail().getUpdatedBy() != null ? company.getAuditTrail().getUpdatedBy().getValue() : null;
    const auditTrailTypeORM: AuditTrailTypeORM = AuditTrailTypeORM.from(createdAt, createdBy, updatedAt, updatedBy);
    companyTypeORM.auditTrail = auditTrailTypeORM;
    return companyTypeORM;
  }
}