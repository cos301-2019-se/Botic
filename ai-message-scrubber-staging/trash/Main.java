import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class Main {

    public static void main(String[] args) {
        try {
            BufferedReader dateOfBirthReader = new BufferedReader(new FileReader("src/date_of_birth.txt"));
            BufferedReader idNumberReader = new BufferedReader(new FileReader("src/id_numbers.txt"));
            BufferedReader emailsReader = new BufferedReader(new FileReader("src/emails.txt"));
            BufferedReader namesReader = new BufferedReader(new FileReader("src/names.txt"));
            BufferedReader passwordsReader = new BufferedReader(new FileReader("src/passwords.txt"));

            BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("src/dataset.txt"));

            List<String> linesDateOfBirth = new ArrayList<String>();
            List<String> linesIdNumbers = new ArrayList<String>();
            List<String> linesEmails = new ArrayList<String>();
            List<String> linesNames = new ArrayList<String>();
            List<String> linesPasswords = new ArrayList<String>();

            List<String> output1 = new ArrayList<>();
            List<String> output2 = new ArrayList<>();
            List<String> output3 = new ArrayList<>();
            List<String> output4 = new ArrayList<>();
            List<String> output5 = new ArrayList<>();
            List<String> output6 = new ArrayList<>();
            List<String> output7 = new ArrayList<>();
            List<String> output8 = new ArrayList<>();
            List<String> output9 = new ArrayList<>();
            List<String> output10 = new ArrayList<>();
            List<String> output11 = new ArrayList<>();
            List<String> output12 = new ArrayList<>();
            List<String> output13 = new ArrayList<>();
            List<String> output14 = new ArrayList<>();
            List<String> output15 = new ArrayList<>();


            //DATE OF BIRTH:
            while (dateOfBirthReader.ready()) {
                linesDateOfBirth.add(dateOfBirthReader.readLine());
            }
            dateOfBirthReader.close();

            //ID NUMBERS:
            while (idNumberReader.ready()) {
                linesIdNumbers.add(idNumberReader.readLine());
            }
            idNumberReader.close();

            //EMAILS:
            while (emailsReader.ready()) {
                linesEmails.add(emailsReader.readLine());
            }
            emailsReader.close();

            //NAMES:
            while (namesReader.ready()) {
                linesNames.add(namesReader.readLine());
            }
            namesReader.close();

            //PASSWORDS:
            while (passwordsReader.ready()) {
                linesPasswords.add(passwordsReader.readLine());
            }
            passwordsReader.close();

            //==========================================================================================================

            //JUST DATE OF BIRTH:
            for (int i = 0; i < 1000; i++) {
                //output1.add("__label__personal-data __label__birthday " + linesDateOfBirth.get(i));
                output1.add(linesDateOfBirth.get(i));
            }

            //JUST ID:
            for (int i = 0; i < 1000; i++) {
                //output2.add("__label__personal-data __label__ID " + linesIdNumbers.get(i));
                output2.add(linesIdNumbers.get(i));
            }

            //JUST EMAIL:
            for (int i = 0; i < 1000; i++) {
                //output3.add("__label__personal-data __label__email " + linesEmails.get(i));
                output3.add(linesEmails.get(i));
            }

            //JUST NAME:
            for (int i = 0; i < 100; i++) {
                //output4.add("__label__personal-data __label__name " + linesNames.get(i));
                output4.add(linesNames.get(i));
            }

            //JUST PASSWORD:
            for (int i = 0; i < 100; i++) {
                //output5.add("__label__personal-data __label__password " + linesPasswords.get(i));
                output5.add(linesPasswords.get(i));
            }

            //DATE OF BIRTH AND ID:
            for (int i = 0; i < 100; i++) {
                output6.add(linesIdNumbers.get(i) + " " + linesDateOfBirth.get(i));
            }

            //DATE OF BIRTH AND EMAIL:
            for (int i = 0; i < 100; i++) {
                output7.add(linesDateOfBirth.get(i) + " " + linesEmails.get(i));
            }

            //DATE OF BIRTH AND NAME:
            for (int i = 0; i < 100; i++) {
                output8.add(linesNames.get(i) + " " + linesDateOfBirth.get(i));
            }

            //DATE OF BIRTH AND PASSWORD:
            for (int i = 0; i < 100; i++) {
                output9.add(linesDateOfBirth.get(i) + " " + linesPasswords.get(i));
            }

            //ID AND EMAIL:
            for (int i = 0; i < 100; i++) {
                output10.add(linesIdNumbers.get(i) + " " + linesEmails.get(i));
            }

            //ID AND NAME:
            for (int i = 0; i < 100; i++) {
                output11.add(linesIdNumbers.get(i) + " " + linesNames.get(i));
            }

            //ID AND PASSWORD:
            for (int i = 0; i < 100; i++) {
                output12.add(linesIdNumbers.get(i) + " " + linesPasswords.get(i));
            }

            //EMAIL AND NAME:
            for (int i = 0; i < 100; i++) {
                output13.add(linesEmails.get(i) + " " + linesNames.get(i));
            }

            //EMAIL AND PASSWORD:
            for (int i = 0; i < 100; i++) {
                output14.add(linesEmails.get(i) + " " + linesPasswords.get(i));
            }

            //NAME AND PASSWORD:
            for (int i = 0; i < 100; i++) {
                output15.add(linesNames.get(i) + " " + linesPasswords.get(i));
            }

            //WRITE TO DATASET:
            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output1.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output2.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output3.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output4.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output5.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output6.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output7.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output8.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output9.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output10.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output11.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output12.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output13.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output14.get(i) + "\n");
            }

            for (int i = 0; i < 100; i++) {
                bufferedWriter.write(output15.get(i) + "\n");
            }
            bufferedWriter.close();

        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println("DONE!!!! :)");
    }
}
