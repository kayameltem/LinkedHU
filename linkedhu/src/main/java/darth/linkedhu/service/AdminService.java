package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.UserExcelExporter;
import darth.linkedhu.encrypt.Encrypt;
import darth.linkedhu.entity.*;
import darth.linkedhu.entity.dtos.AnnouncementsDto;
import darth.linkedhu.entity.dtos.UserDto;
import darth.linkedhu.enums.AnnouncementType;
import darth.linkedhu.enums.UserType;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.lang.reflect.Array;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TreeSet;
import java.util.concurrent.ExecutionException;

import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@Service
public class AdminService {
    LoggerService loggerService = new LoggerService();

    public String save( Admin admin) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users").document(admin.getMail()).set(admin);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Admin get(Admin admin) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Users")
                .document(admin.getMail());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Admin admin2;

        if(document.exists()) {
            admin2 = document.toObject(Admin.class);
            return admin2;
        }else {
            return null;
        }
    }

    public String update(Admin admin) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
                .document(admin.getMail()).set(admin);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Admin admin) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Users")
                .document(admin.getMail()).delete();
        System.out.println(writeResult);
        return "Document with Admin Mail: "+admin.getMail()+" has been deleted";
    }


    public boolean deleteAnnouncement(AnnouncementsDto announcementsDto) throws ExecutionException, InterruptedException {
        Announcements announcement = announcementsDto.getAnnouncement();

        AnnouncementsService announcementsService = new AnnouncementsService();
        Announcements announcement1 = announcementsService.findAnnouncementById(announcement.getAnnouncementId());


        switch (announcement1.getType()) {
            case JOB:
                JobService jobService = new JobService();
                jobService.delete((Job) announcement1);
                break;
            case INTERNSHIP:
                InternshipService internshipService = new InternshipService();
                internshipService.delete((Internship) announcement1);
                break;
            case PROJECT:
                ProjectService projectService = new ProjectService();
                projectService.delete((Project) announcement1);
                break;
            case SCHOLARSHIP:
                ScholarshipService scholarshipService = new ScholarshipService();
                scholarshipService.delete((Scholarship) announcement1);
                break;
        }
        return true;
    }

    public boolean deleteUser(UserDto userDto) throws ExecutionException, InterruptedException {
        User user = userDto.getUser();

        UserService userService = new UserService();
        User currentUser = userService.findById(user.getNationalId());

        if (currentUser.getMail()!=null)
        {
            if (currentUser.getType().equals(UserType.ACADEMICIAN)) {
                AcademicianService academicianService = new AcademicianService();
                academicianService.delete((Academician) currentUser);
            }
            else if (currentUser.getType().equals(UserType.GRADUATE)) {
                GraduateService graduateService = new GraduateService();
                graduateService.delete((Graduate) currentUser);
            }
            else if (currentUser.getType().equals(UserType.UNDERGRADUATE)) {
                UndergraduateService undergraduateService = new UndergraduateService();
                undergraduateService.delete((Undergraduate) currentUser);
            }
        }
        else{
            return false;
        }

        return true;
    }

    public User findByNationalId(String str) throws ExecutionException, InterruptedException {

        Firestore db= FirestoreClient.getFirestore();
        ArrayList<User> searchUsers = new ArrayList<>();

        // Create a reference to the cities collection
        CollectionReference Users = db.collection("Users");


        if (str.length() == 0){
            return new User();
        }

        // Create a query against the collection.
        Query query = Users.whereEqualTo("nationalId", str);

        // retrieve  query results asynchronously using query.get()
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            searchUsers.add(document.toObject(User.class));
        }

        searchUsers = searchUsers.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<User>(comparing(User::getNationalId))),ArrayList::new));
        if (searchUsers.isEmpty()) {
            return new User();
        }
        return searchUsers.get(0);
    }

    public List<User> listAllAsJson() throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("Users").get();
        ArrayList<User> searchUsers;

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        ArrayList<User> list = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(User.class));
        }
        searchUsers = list.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<User>(comparing(User::getNationalId))),ArrayList::new));
        return searchUsers;
    }
    public String getLog(String mail) throws ExecutionException, InterruptedException {
        UserLog userLog = loggerService.findUserByMailForLogs(mail);
        return userLog.getLog();
    }
}
