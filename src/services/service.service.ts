// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class ServiceService {


//   public host = environment.apiUrl;

//   constructor(private http: HttpClient) { }

//   getUserConnect(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/users/get', { headers: headers });
//   }

//   getUserConnectByType(auth_token: any, name: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/users/loadUserType/' + name, { headers: headers });
//   }

//   updateUserAdress(auth_token: any, idUser: any, data: Users): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.put<any>(this.host + '/users/update-self-address', {
//       id: idUser,
//       adrUser: data.adrUser,
//       localityUser: data.localityUser,
//       validiteAdresse: data.validiteAdresse
//     }, { headers: headers });
//   }

//   updateUserInfo(auth_token: any, data: Users): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.put<any>(this.host + '/users/update',
//       {
//         nomUser: data.nomUser,
//         prenomUser: data.prenomUser,
//         birthdayUser: data.birthdayUser,
//         nationalityUser: data.nationalityUser,
//         adrUser: data.adrUser,
//         postalUser: data.postalUser,
//         localityUser: data.localityUser,
//       }, { headers: headers });
//   }


//   connexion(email: string, tel: string, password: string) {
//     const headers = new HttpHeaders().set('Content-Type', 'application/json');
//     return this.http.post<any>(this.host + '/authentication/login',
//       {
//         emailUser: email,
//         telUser: tel,
//         passwordUser: password
//       }, { headers });
//   }

//   verifyPhoneNumber(tel: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.get<any>(this.host + '/authentication/get-user-by-phone/' + tel, { headers: headers });
//   }

//   verifyEmailUnique(email: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.get<any>(this.host + '/authentication/get-user-by-email/' + email, { headers: headers });
//   }

//   //Assurances
//   getAssurance(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/packassurance/loadWithNameAssur', { headers: headers });
//   }

//   getAssuranceCompany(name: string, auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/packassurance/get/' + name, { headers: headers });
//   }

//   //Offres
//   getOffre(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/packOffre/get', { headers: headers });
//   }

//   getOffreContrat(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/contratoffre/getAll', { headers: headers });
//   }

//   deleteOffreContrat(id: string, auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/contratoffre/delete/' + id, { headers: headers });
//   }

//   getAssuranceContrat(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/contratassurance/getAll', { headers: headers });
//   }

//   deleteAssuranceContrat(id: string, auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/contratassurance/delete/' + id, { headers: headers });
//   }

//   getMandatDeCourtage(auth_token: any): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/mandatdecourtage/load', { headers: headers });
//   }

//   createMandatDeCourtage(auth_token: any, documentLink: string): Observable<any> {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/mandatdecourtage/create', {
//       pdfMandatDeCourtage: documentLink,
//     }, { headers: headers });
//   }

//   // Enregistrer les offres
//   registerOfrreVehicule(auth_token: any, data: Engin) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/offreVehicule/create',
//       {
//         marqueVehicle: data.marqueVehicle,
//         typeVehicle: data.typeVehicle,
//         premierDateCirculation: data.premierDateCirculation,
//         receptionVehicle: data.receptionVehicle,
//         prixCatalog: data.prixCatalog,
//         optionVehicle: data.optionVehicle,
//         distanceAnnuel: data.distanceAnnuel,
//         packoffre: data.packoffre
//       }, { headers: headers });
//   }

//   registerOffreEbike(auth_token: any, data: Ebike) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/offreEbike/create',
//       {
//         marqueEbike: data.marqueEbike,
//         modeleEbike: data.modeleEbike,
//         anneeAcquisition: data.anneeAcquisition,
//         prixEbike: data.prixEbike,
//         packoffre: data.packoffre
//       }, { headers: headers });
//   }

//   registerOffreAutre(auth_token: any, data: autreOffre) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/assuranceOffreAutres/create',
//       {
//         maladieLaMal: data.maladieLaMal,
//         maladieCompl: data.maladieCompl,
//         voyage: data.voyage,
//         protectionJuridiq: data.protectionJuridiq,
//         garantieLoyer: data.garantieLoyer,
//         animaux: data.animaux,
//         packoffre: data.packOffre
//       }, { headers: headers });
//   }


//   //Enregistrer les assurances offres
//   registerOffreVehiculeAssurance(auth_token: any, data: AssuranceEngin) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/assuranceOffreVehicule/create',
//       {
//         reponsabiliteCivileVehic: data.reponsabiliteCivileVehic,
//         cascoPartielle: data.cascoPartielle,
//         cascoColission: data.cascoColission,
//         dommageParking: data.dommageParking,
//         assistanceVehic: data.accidentVehic,
//         accidentVehic: data.assistanceVehic,
//         effetsPersonnels: data.effetsPersonnels,
//         offrevehicule: data.offrevehicule
//       }, { headers: headers });
//   }

//   registerOffreEbikeAssurance(auth_token: any, data: AssuranceEbike) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/assuranceOffreEbike/create',
//       {
//         volEbike: data.volEbike,
//         deteriorationEbike: data.deteriorationEbike,
//         perteEbike: data.perteEbike,
//         assistanceEbike: data.assistanceEbike,
//         offreebike: data.offreebike
//       }, { headers: headers });
//   }

//   registerOffreMenageAssurance(auth_token: any, data: AssuranceOffreMenage) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/assuranceOffreMenage/create',
//       {
//         reponsabiliteCivileMen: data.reponsabiliteCivileMen,
//         conduireVehicule: data.conduireVehicule,
//         locauxLoues: data.locauxLoues,
//         volSimple: data.volSimple,
//         brisGlaceMen: data.brisGlaceMen,
//         cascoMenage: data.cascoMenage,
//         cyberAssuranceMen: data.cyberAssuranceMen,
//         offremenage: data.offremenage
//       }, { headers: headers });
//   }

//   registerOffreBatimentAssurance(auth_token: any, data: AssuranceOffreBatiment) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/assuranceOffreBatiment/create',
//       {
//         responsabiliteCivileBatim: data.responsabiliteCivileBatim,
//         amenagementExt: data.amenagementExt,
//         panneauSolaire: data.panneauSolaire,
//         trembleTerre: data.trembleTerre,
//         brisGlaceBatim: data.brisGlaceBatim,
//         cascoBatiment: data.cascoBatiment,
//         offrebatiment: data.offrebatiment
//       }, { headers: headers });
//   }



//   //Enregistrer les contrats

//   registerContratOffre(auth_token: any, data: ContratOffre) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/contratoffre/create',
//       {
//         operation: data.operation,
//         packoffre: data.packoffre,
//         user: data.user
//       }, { headers: headers });
//   }

//   registerContratAssurance(auth_token: any, data: ContratAssurance) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/contratassurance/create',
//       {
//         pdfMaladie: data.pdfMaladie,
//         operation: data.operation,
//         etat: data.etat,
//         user: data.user,
//         packassurance: data.packassurance
//       }, { headers: headers });
//   }

//   //Enregistrer les Menage
//   registerOffreMenage(auth_token: any, data: OffreMenage) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/offreMenage/create',
//       {
//         nbrePiece: data.nbrePiece,
//         inventMen: data.inventMen,
//         nbreAdulte: data.nbreAdulte,
//         nbreEnfant: data.nbreEnfant,
//         proprietaire: data.proprietaire,
//         packoffre: data.packoffre,
//       }, { headers: headers });
//   }

//   //Enregistrer les Batiment
//   registerOffreBatiment(auth_token: any, data: Batiment) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/offreBatiment/create',
//       {
//         valeurBatim: data.valeurBatim,
//         toitBatim: data.toitBatim,
//         chauffageBatim: data.chauffageBatim,
//         typeHabitation: data.typeHabitation,
//         anneeConstruct: data.anneeConstruct,
//         packoffre: data.packoffre,
//       }, { headers: headers });
//   }

//   //Enregistrer les User
//   registerUser(data: registerEtape4) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/authentication/register',
//       {
//         nomUser: data.nomUser,
//         prenomUser: data.prenomUser,
//         birthdayUser: data.birthdayUser,
//         nationalityUser: data.nationalityUser,
//         adrUser: data.adrUser,
//         postalUser: data.postalUser,
//         localityUser: data.localityUser,
//         codeCounsellor: data.codeCounsellor,
//         telUser: data.telUser,
//         emailUser: data.emailUser,
//         passwordUser: data.passwordUser,
//         photoUser: '',
//         validiteAdresse: null,
//         typeusers: null
//       }, { headers: headers });
//   }

//   //Validation Telephone number
//   sendCodeValidation(data: any) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/otp/create',
//       {
//         phoneNumber: data,
//         verificationMethod: 'sms',
//         email: null
//       }, { headers: headers });
//   }

//   // Send code verification for phone Number OTP
//   sendCodeVerification(data: CodeVerification) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/otp/check',
//       {
//         code: data.code,
//         phoneNumber: data.phoneNumber,
//       }, { headers: headers });
//   }

//   // Send Mail to admin informing that user just changed his address
//   sendMailInfoAddressChanged(auth_token: any) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/mail/user-address-changed', {}, { headers: headers });
//   }

//   // To welcome client after he had been registered
//   sendWelcomeMail(data: any) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/mailing/welcome',
//       {
//         to: data,
//       }, { headers: headers });
//   }

//   //Send Code for Validation to email (data) in order to reset the password
//   sendMailCodeValidation(data: string) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/forgot-password/get-passcode',
//       {
//         emailUser: data,
//       }, { headers: headers });
//   }

//   // Send Code for Verification in order to reset the password
//   sendPassCodeForVerification(data: MailCodeVerification) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/authentication/verifyPasscode',
//       {
//         emailUser: data.emailUser,
//         code: data.passcode,
//       }, { headers: headers });
//   }

//   // Set New Password for User after Reset
//   setNewPassword(auth_token: any, data: any) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/authentication/set-new-password',
//       {
//         newPassword: data
//       }, { headers: headers });
//   }

//   // Send Mail to user informing that his password was successfully changed
//   sendMailInfoPasswordReset(data: FixPasswordData) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//     });
//     return this.http.post<any>(this.host + '/mailing/password-reset-successfully',
//       {
//         to: data.to,
//         nomUser: data.nomUser,
//         prenomUser: data.prenomUser
//       }, { headers: headers });
//   }

//   //message
//   sendMessageChat(auth_token: string, data: Message) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/message/create',
//       {
//         contenuMsg: data.contenuMsg,
//         statutMsg: false,
//         receiver: data.receiver
//       }, { headers: headers });
//   }

//   loadMessageChat(auth_token: string, receiverId: string) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.get<any>(this.host + '/message/load/' + receiverId, { headers: headers })
//       .pipe(delay(1000));
//   }

//   //updateUserInfo

//   updatePassword(auth_token: any, data: UpdateUserPassword) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.put<any>(this.host + '/authentication/update-password',
//       {
//         passwordUser: data.oldPassword,
//         newPassword: data.newPassword
//       }, { headers: headers });
//   }

//   // Save document on server from base64 encoded string
//   saveIncodedDocument(auth_token: any, data: UploadDataFormat) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/files/documents/create-from-b64',
//       {
//         b64String: data.b64String,
//         originalFileName: data.originalFileName,
//         fileExtension: data.fileExtension
//       }, { headers: headers });
//   }

//   // Save Images on server from base64 encoded string
//   writeFormDataImages(auth_token: any, data: FormData) {
//     const headers = new HttpHeaders({
//       'enctype': 'multipart/form-data;',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.post<any>(this.host + '/files/pictures/create',
//       data
//       , { headers: headers });
//   }

//   updateUserProfilePicture(auth_token: any, pictureUniqueName: any) {
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${auth_token}`
//     });
//     return this.http.put<any>(this.host + '/users/update-profile-photo',
//       {
//         photoUser: pictureUniqueName
//       }, { headers: headers });
//   }
// }
