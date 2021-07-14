# TODO

- [ ] GET fe verification page
  - [ ] validate code
  - [ ] store in session
  
- [ ] `/create-account/email-verification` handle email / `req.session.yourDetails.workEmailAddress` possibly being invalid

- [ ] fixup be error shapes - `email-verification.service/index`
- [ ] fixup be error shapes - `sofware-details.service/index`
- [ ] fixup be error shapes - `user.service/index`

- [ ] remove hardcoded values
  - [ ] `/create-account/your-details`
  - [ ] `/create-account/terms-and-conditions`
- [ ] password reset 

- [ ] change error response shape, all unanswered meta
  - [ ] fix up `/eligibility/cyber-security`
  - [ ] fix up `/eligibility/accessibility`

- [ ] notify
- [ ] ch integration

- [ ] typescript for knex response

- [ ] session timeout page
- [ ] 404 page
- [ ] 500 page

- [ ] shut up log noise in tests

- [ ] be - `validate-your-details` - testing

# UX Q's

- [ ] verification code not recognised journey
- [ ] verification code no session journey
- [ ] password rules
- [ ] `/create-account/verification` - contact BEIS link

# Testing

- [ ] cypress
- [ ] axe testing cypress
- [ ] load testing
- [ ] rate limiting

# Before Production Checklist

- [ ] csrf
- [ ] remove `sql` directory
- [ ] stop db seeds from running in prod
- [ ] stop seeds from running if any data exists

# HLD

- [ ] `verification_code` > also need to capture the email? 
- [ ] `verification_code` > `sent_at`
- [ ] `verification_code` > add index for lookup of both email & code
- [ ] `vendor_company` > website = 50?
- [ ] `vendor_company` > email = 50, `vendor_company_user` > email = 500
- [ ] `vendor_company_user` > fname / sname - GDS conflict - https://design-system.service.gov.uk/patterns/names/

# Done

- [x] split first name / last name - raise with AR, see #HLD
- [x] company table
- [x] verification link generation
- [x] docker networking setup
- [x] VR - get api up and running
- [x] FE mask password input
- [x] jwt setup
- [x] log in screen
- [x] add error message display
- [x] front end middleware error mapping
- [x] docker networking fe > be
- [x] express session