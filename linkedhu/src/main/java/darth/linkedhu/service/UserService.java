package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.controller.AcademicianController;
import darth.linkedhu.controller.GraduateController;
import darth.linkedhu.controller.UndergraduateController;
import darth.linkedhu.entity.*;
import darth.linkedhu.entity.dtos.PasswordDto;
import darth.linkedhu.entity.dtos.ProfessionDto;
import darth.linkedhu.entity.dtos.UserDto;
import darth.linkedhu.enums.LogType;
import darth.linkedhu.enums.UserType;
import darth.linkedhu.service.session.SessionManager;
import darth.linkedhu.encrypt.Encrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.security.SecureRandom;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static darth.linkedhu.enums.UserType.*;
import static java.util.Comparator.comparing;
import static java.util.Comparator.comparingInt;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;



@Service
public class UserService {
    @Autowired
    LoggerService loggerService = new LoggerService();
    @Autowired
    SessionManager userSession;

    @Autowired
    MailService mailservice = new MailService();

    // TODO CRUD operations of user entity here


    public boolean signUp(User user, UserType type) throws ExecutionException, InterruptedException {

        if(Objects.nonNull(findUserByMail(user.getMail())))
        {
            System.out.println("This user already exists");
            return false;
        }
        else if(Objects.equals(user.getMail(), "") || Objects.equals(user.getPassword(), ""))
        {
            System.out.println("Email and password mandatory");
            return false;
        }


        Firestore db= FirestoreClient.getFirestore();
        ArrayList<User> searchUsers = new ArrayList<>();

        // Create a reference to the cities collection
        CollectionReference Users = db.collection("SchoolDatabase").document("CENG_DB").collection("People");


        if (user.getNationalId().length() == 0){
            return false;
        }

        // Create a query against the collection.
        Query query = Users.whereEqualTo("nationalId", user.getNationalId());

        // retrieve  query results asynchronously using query.get()
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            searchUsers.add(document.toObject(User.class));
        }

        User dbUser = null;
        searchUsers = searchUsers.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<User>(comparing(User::getNationalId))),ArrayList::new));
        if (searchUsers.size()>0){
            dbUser = searchUsers.get(0);
        }

        if (dbUser == null){
            return false;
        }

        type = dbUser.getType();
        if (type.equals(UNDERGRADUATE)) {

            ArrayList<Undergraduate> searchUndergraduate = new ArrayList<>();
            Undergraduate undergraduateUser = null;

            for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
                searchUndergraduate.add(document.toObject(Undergraduate.class));
            }

            searchUndergraduate = searchUndergraduate.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<Undergraduate>(comparing(Undergraduate::getNationalId))),ArrayList::new));
            if (searchUndergraduate.size()>0){
                undergraduateUser = searchUndergraduate.get(0);
            }

            Undergraduate undergraduate = new Undergraduate();
            undergraduate.setNationalId(user.getNationalId());
            undergraduate.setName(user.getName());
            undergraduate.setSurname(user.getSurname());
            undergraduate.setMail(user.getMail());
            undergraduate.setType(UserType.UNDERGRADUATE);
            undergraduate.setPassword(Encrypt.encrypt(user.getPassword()));
            undergraduate.setBirthdate(user.getBirthdate());
            undergraduate.setStudentId((undergraduateUser.getStudentId()));

            UndergraduateService undergraduateService = new UndergraduateService();

            undergraduateService.save(undergraduate);

        }

        if (type.equals(GRADUATE)) {

            ArrayList<Graduate> searchGraduate = new ArrayList<>();
            Graduate graduateUser = null;

            for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
                searchGraduate.add(document.toObject(Graduate.class));
            }


            searchGraduate = searchGraduate.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<Graduate>(comparing(Graduate::getNationalId))),ArrayList::new));
            if (searchGraduate.size()>0){
                graduateUser = searchGraduate.get(0);
            }


            Graduate graduate = new Graduate();
            graduate.setNationalId(user.getNationalId());
            graduate.setName(user.getName());
            graduate.setSurname(user.getSurname());
            graduate.setMail(user.getMail());
            graduate.setType(UserType.GRADUATE);
            graduate.setPassword(Encrypt.encrypt(user.getPassword()));
            graduate.setBirthdate(user.getBirthdate());
            graduate.setDegree(graduateUser.getDegree());
            graduate.setStudentId(graduateUser.getStudentId());
            graduate.setProfession(graduateUser.getProfession());
            graduate.setTitle(graduateUser.getTitle());

            GraduateService graduateService = new GraduateService();

            graduateService.save(graduate);
        }

        if (type.equals(ACADEMICIAN)) {

            ArrayList<Academician> searchAcademician = new ArrayList<>();
            Academician academicianUser = null;

            for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
                searchAcademician.add(document.toObject(Academician.class));
            }

            searchAcademician = searchAcademician.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<Academician>(comparing(Academician::getNationalId))),ArrayList::new));
            if (searchAcademician.size()>0){
                academicianUser = searchAcademician.get(0);
            }


            Academician academician = new Academician();
            academician.setNationalId(user.getNationalId());
            academician.setName(user.getName());
            academician.setSurname(user.getSurname());
            academician.setMail(user.getMail());
            academician.setType(ACADEMICIAN);
            academician.setPassword(Encrypt.encrypt(user.getPassword()));
            academician.setBirthdate(user.getBirthdate());
            academician.setProfession(academicianUser.getProfession());
            academician.setTitle(academicianUser.getTitle());

            AcademicianService academicianService = new AcademicianService();

            academicianService.save(academician);
        }

        if (type.equals(ADMIN)) {
            Admin admin = new Admin();
            admin.setNationalId(user.getNationalId());
            admin.setName(user.getName());
            admin.setSurname(user.getSurname());
            admin.setMail(user.getMail());
            admin.setType(UserType.ADMIN);
            admin.setPassword(Encrypt.encrypt(user.getPassword()));
            admin.setBirthdate(user.getBirthdate());

            AdminService adminService = new AdminService();

            adminService.save(admin);
        }

        return true;
    }

    public User login(UserDto userDto) throws ExecutionException, InterruptedException {
        User tempUser = userDto.getUser();
        if (Objects.isNull(tempUser.getMail()) || Objects.equals(tempUser.getMail(), "")) {
            System.out.println("mail is mandatory");
            return new User();
        }

        User user = findUserByMail(tempUser.getMail());
        if (Objects.isNull(user)){
            return new User();
        }
        String encryptPassword = Encrypt.encrypt(tempUser.getPassword());
        if (user.getPassword().equals(encryptPassword) && user.getMail().equals(tempUser.getMail())) {
            user.setSignStatus(true);

            if (user.getType().equals(ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                academicianService.update((Academician) user);
            } else if (user.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                graduateService.update((Graduate) user);
            } else if (user.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                undergraduateService.update((Undergraduate) user);
            }

            return user;
        } else {
            System.out.println("incorrect password or email");
            return new User();
        }


    }

    public boolean logout(UserDto userDto) throws ExecutionException, InterruptedException, IllegalAccessException {


        if (userDto == null) {
            return false;
        }
        User user = findUserByMail(userDto.getUser().getMail());

        if (user.isSignStatus()){
            // sign status user set and store database with type in update method
            user.setSignStatus(false);

            if (user.getType().equals(ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                academicianService.update((Academician) user);
            } else if (user.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                graduateService.update((Graduate) user);
            } else if (user.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                undergraduateService.update((Undergraduate) user);
            }
            return true;
        }
        else{
            System.out.println(userDto.getUser().getNationalId() + " already log out");
            return false;
        }

    }


    public boolean forgotPassword(PasswordDto passwordDto) throws ExecutionException, InterruptedException {

        if (Objects.nonNull(passwordDto.getMail())) {

            if (Objects.equals(passwordDto.getMail(), ""))
            {
                System.out.println("Mail is mandatory");
                return false;
            }
            else if(Objects.isNull(findUserByMail(passwordDto.getMail())))
            {
                System.out.println("There is no user with this mail");
                return false;
            }

            String encryptPassword = Encrypt.encrypt(generateRandomPassword(7));

            User user = findUserByMail(passwordDto.getMail());
            if (Objects.isNull(user)) {
                return false;
            } else {
                mailservice.sendMail("selcukyilmaz2000@hotmail.com", "NEW PASSWORD : " + encryptPassword );
            }

            if (user.getType().equals(ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                user.setPassword(encryptPassword);
                academicianService.update((Academician) user);
            } else if (user.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                user.setPassword(encryptPassword);
                graduateService.update((Graduate) user);
            } else if (user.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                user.setPassword(encryptPassword);
                undergraduateService.update((Undergraduate) user);
            }else if (user.getType().equals(UserType.ADMIN)){
                AdminService adminService = new AdminService();
                user.setPassword(encryptPassword);
                adminService.update((Admin) user);
            }
            return true;

        }
        else{
            System.out.println("Mail is mandatory");
        }

        return false;
    }

    public boolean changePassword(PasswordDto passwordDto) throws ExecutionException, InterruptedException {

        if (Objects.nonNull(passwordDto.getMail())) {

            if (Objects.equals(passwordDto.getMail(), ""))
            {
                System.out.println("Mail is mandatory");
                return false;
            }
            else if(Objects.isNull(findUserByMail(passwordDto.getMail())))
            {
                System.out.println("There is no user with this mail");
                return false;
            }

            User user = findUserByMail(passwordDto.getMail());

            if (user.getType().equals(ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                user.setPassword(Encrypt.encrypt(passwordDto.getPassword()));
                academicianService.update((Academician) user);
            } else if (user.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                user.setPassword(Encrypt.encrypt(passwordDto.getPassword()));
                graduateService.update((Graduate) user);
            } else if (user.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                user.setPassword(Encrypt.encrypt(passwordDto.getPassword()));
                undergraduateService.update((Undergraduate) user);
            } else if (user.getType().equals(UserType.ADMIN)){
                AdminService adminService = new AdminService();
                user.setPassword(Encrypt.encrypt(passwordDto.getPassword()));
                adminService.update((Admin) user);
            }
            return true;

        }
        else{
            System.out.println("Mail is mandatory");
        }

        return false;
    }


    public User searchUser(String mail) throws InterruptedException, ExecutionException {
        return findUserByMail(mail);
    }

    public User editProfile(UserDto userDto) throws ExecutionException, InterruptedException, IllegalAccessException {
        User tempUser = userDto.getUser();
        User oldUser = findUserByMail(tempUser.getMail());

        if (oldUser.getType().equals(UserType.ACADEMICIAN)) {
            AcademicianService academicianService = new AcademicianService();
            merge(oldUser,tempUser);
            academicianService.update((Academician) oldUser);
        } else if (oldUser.getType().equals(UserType.GRADUATE)) {
            GraduateService graduateService = new GraduateService();
            merge(oldUser,tempUser);
            graduateService.update((Graduate) oldUser);
        } else if (oldUser.getType().equals(UserType.UNDERGRADUATE)) {
            UndergraduateService undergraduateService = new UndergraduateService();
            merge(oldUser,tempUser);
            undergraduateService.update((Undergraduate) oldUser);
        }else if (oldUser.getType().equals(UserType.ADMIN)){
            AdminService adminService = new AdminService();
            merge(oldUser,tempUser);
            adminService.update((Admin) oldUser);
        }

        return tempUser;
    }

    public boolean editProfession(ProfessionDto professionDto) throws ExecutionException, InterruptedException {
        User user = findUserByMail(professionDto.getMail());

        AcademicianService academicianService = new AcademicianService();
        Academician academician = (Academician) user;
        academician.setProfession(professionDto.getProfession());
        academicianService.update(academician);

        return true;
    }

    public boolean editContact(UserDto userDto) throws ExecutionException, InterruptedException, IllegalAccessException {
        User tempUser = userDto.getUser();
        User oldUser = findUserByMail(tempUser.getMail());

        if (tempUser.getFacebookUrl() != null){
            oldUser.setFacebookUrl(tempUser.getFacebookUrl());
        }
        if (tempUser.getGithubUrl() != null){
            oldUser.setGithubUrl(tempUser.getGithubUrl());
        }
        if (tempUser.getInstagramUrl() != null){
            oldUser.setInstagramUrl(tempUser.getInstagramUrl());
        }
        if (tempUser.getLinkedinUrl() != null){
            oldUser.setLinkedinUrl(tempUser.getLinkedinUrl());
        }
        if (tempUser.getTwitterUrl() != null){
            oldUser.setTwitterUrl(tempUser.getTwitterUrl());
        }
        if (tempUser.getPhoneNumber() != null){
            oldUser.setPhoneNumber(tempUser.getPhoneNumber());
        }

        if (oldUser.getType().equals(UserType.ACADEMICIAN)) {
            AcademicianService academicianService = new AcademicianService();
            academicianService.update((Academician) oldUser);
        } else if (oldUser.getType().equals(UserType.GRADUATE)) {
            GraduateService graduateService = new GraduateService();
            graduateService.update((Graduate) oldUser);
        } else if (oldUser.getType().equals(UserType.UNDERGRADUATE)) {
            UndergraduateService undergraduateService = new UndergraduateService();
            undergraduateService.update((Undergraduate) oldUser);
        }else if (oldUser.getType().equals(UserType.ADMIN)){
            AdminService adminService = new AdminService();
            adminService.update((Admin) oldUser);
        }

        return true;
    }

    public boolean deleteAccount(UserDto userDto) throws ExecutionException, InterruptedException {
        User user = userDto.getUser();
        User currentUser = findUserByMail(user.getMail());

        if(Encrypt.encrypt(user.getPassword()).equals(currentUser.getPassword())) {
            if (currentUser.getType().equals(UserType.ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                academicianService.delete((Academician) currentUser);
            } else if (currentUser.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                graduateService.delete((Graduate) currentUser);
            } else if (currentUser.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                undergraduateService.delete((Undergraduate) currentUser);
            } else if (currentUser.getType().equals(UserType.ADMIN)){
                AdminService adminService = new AdminService();
                adminService.delete((Admin) currentUser);
            }
        }
        return true;
    }


    public ArrayList<User> find(String str) throws ExecutionException, InterruptedException {
        String[] username = str.split(" ");
        String surname;

        Firestore db= FirestoreClient.getFirestore();
        ArrayList<User> searchUsers = new ArrayList<>();

        // Create a reference to the cities collection
        CollectionReference Users = db.collection("Users");


        if (username.length == 0){
            return null;
        }
        String name = username[0];

        // Create a query against the collection.
        Query query_name = Users.whereEqualTo("name", name);

        // retrieve  query results asynchronously using query.get()
        ApiFuture<QuerySnapshot> querySnapshot_name = query_name.get();

        for (DocumentSnapshot document : querySnapshot_name.get().getDocuments()) {
            searchUsers.add(document.toObject(User.class));
        }

        if (username.length>1){
            surname = username[1];

            // Create a query against the collection.
            Query query_surname = Users.whereEqualTo("surname", surname);

            // retrieve  query results asynchronously using query.get()
            ApiFuture<QuerySnapshot> querySnapshot_surname = query_surname.get();

            for (DocumentSnapshot document : querySnapshot_surname.get().getDocuments()) {
                searchUsers.add(document.toObject(User.class));
            }
        }
        searchUsers = searchUsers.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<User>(comparing(User::getNationalId))),ArrayList::new));
        return searchUsers;
    }


    public static String generateRandomPassword(int len) {
        // ASCII range – alphanumeric (0-9, a-z, A-Z)
        final String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        // each iteration of the loop randomly chooses a character from the given
        // ASCII range and appends it to the StringBuilder instance
        for (int i = 0; i < len; i++) {
            int randomIndex = random.nextInt(chars.length());
            sb.append(chars.charAt(randomIndex));
        }
        return sb.toString();
    }


    public User findUserByMail(String mail) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = dbFirestore.collection("Users")
                .document(mail);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        User user = null;

        if (document.exists()) {
            String type = document.get("type").toString();
            if (type.equals("ACADEMICIAN")){
                user = document.toObject(Academician.class);
            }
            else if (type.equals("GRADUATE")){
                user = document.toObject(Graduate.class);
            }
            else if (type.equals("UNDERGRADUATE")){
                user = document.toObject(Undergraduate.class);
            }
            else if (type.equals("ADMIN")){
                user = document.toObject(Admin.class);
            }
        }
        else{
            System.out.println("User not Exist");
            return null;
        }
        return user;
    }

    public void merge(User oldObject,User newObject) throws IllegalAccessException {

        assert oldObject.getClass().getName().equals(newObject.getClass().getName());

        for (Field field : oldObject.getClass().getDeclaredFields()) {

            for (Field newField : newObject.getClass().getDeclaredFields()) {

                if (field.getName().equals(newField.getName())) {

                    try {

                        field.set(
                                oldObject,
                                newField.get(newObject) == null
                                        ? field.get(oldObject)
                                        : newField.get(newObject));

                    } catch (IllegalAccessException ignore) {
                        // Field update exception on final modifier and other cases.
                    }
                }
            }
        }

        if (newObject.getName() != null){
            oldObject.setName(newObject.getName());
        }
        if (newObject.getSurname() != null){
            oldObject.setSurname(newObject.getSurname());
        }
        if (newObject.getPassword() != null){
            oldObject.setPassword(Encrypt.encrypt(newObject.getPassword()));
        }
        if (newObject.getNationalId() != null){
            oldObject.setNationalId(newObject.getNationalId());
        }
        if (newObject.getBirthdate() != null){
            oldObject.setBirthdate(newObject.getBirthdate());
        }
    }



    public User fetchUser(UserDto userDto) throws ExecutionException, InterruptedException {

        if (userDto == null) {
            User user = new User();
            user.setMail("");
            return user;
        }
        User user = userDto.getUser();
        user = findUserByMail(user.getMail());
        return user;
    }


    // Function to remove duplicates from an ArrayList
    public static <T> ArrayList<T> removeDuplicates(ArrayList<T> list)
    {

        // Create a new ArrayList
        ArrayList<T> newList = new ArrayList<T>();

        // Traverse through the first list
        for (T element : list) {

            // If this element is not present in newList
            // then add it
            if (!newList.contains(element)) {

                newList.add(element);
            }
        }

        // return the new list
        return newList;
    }

    public User findById(String str) throws ExecutionException, InterruptedException {
        Firestore db= FirestoreClient.getFirestore();

        CollectionReference Users = db.collection("Users");
        if (str.length() == 0){
            return null;
        }

        Query query_name = Users.whereEqualTo("nationalId", str);

        // retrieve  query results asynchronously using query.get()
        ApiFuture<QuerySnapshot> querySnapshot_name = query_name.get();

        User user = new User();
        for (DocumentSnapshot document : querySnapshot_name.get().getDocuments()) {
            String type = document.get("type").toString();
            if (type.equals("ACADEMICIAN")){
                user = document.toObject(Academician.class);
            }
            else if (type.equals("GRADUATE")){
                user = document.toObject(Graduate.class);
            }
            else if (type.equals("UNDERGRADUATE")){
                user = document.toObject(Undergraduate.class);
            }
            else if (type.equals("ADMIN")){
                user = document.toObject(Admin.class);
            }

        }

        return user;
    }

    public List<User> listAll() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("Users").get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        ArrayList<User> list = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(User.class));
        }
        return list;
    }

}

