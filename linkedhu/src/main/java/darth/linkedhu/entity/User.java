package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.enums.UserType;
import lombok.*;

import java.util.ArrayList;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    public User(String nationalId){
        this.nationalId = nationalId;
    };

    @SerializedName("nationalId")
    private String nationalId;

    @SerializedName("name")
    private String name;

    @SerializedName("surname")
    private String surname;

    @SerializedName("password")
    private String password;

    @SerializedName("mail")
    private String mail;

    @SerializedName("type")
    private UserType type;

    @SerializedName("signStatus")
    private boolean signStatus;

    @SerializedName("instagramUrl")
    private String instagramUrl;

    @SerializedName("linkedinUrl")
    private String linkedinUrl;

    @SerializedName("facebookUrl")
    private String facebookUrl;

    @SerializedName("githubUrl")
    private String githubUrl;

    @SerializedName("twitterUrl")
    private String twitterUrl;

    @SerializedName("phoneNumber")
    private String phoneNumber;

    @SerializedName("birthdate")
    private String birthdate;

    @SerializedName("appliedAnnouncements")
    private ArrayList<String> appliedAnnouncements;

}

