import 'package:flutter/material.dart';
import '../Models/Employee.dart';
import '../Services/APIService.dart';


class TeamTab extends StatefulWidget {
  @override
  _TeamTabState createState() => _TeamTabState();
}

class _TeamTabState extends State<TeamTab> {

  bool _isLoading = true;
  final api = APIService();
  late Team _team;

  @override
  void initState()
  {
    getShifts();
  }

  void getShifts() async{
    _team = await api.GetTeammates();
    setState(() {
      _isLoading = false;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Team'),
        automaticallyImplyLeading: false,
      ),
      body: (
          _isLoading ? Center(child: CircularProgressIndicator(),):
          ListView.builder(
            itemCount: _team.teammates.length+1,
            itemBuilder: (context, index) {
              Employee coworker;
              if(index == 0){
                coworker = _team.manager;
              }
              else {
                coworker = _team.teammates[index-1];
              }
              return ListTile(
                title: Text(coworker.fullName),
                trailing: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        SizedBox(height: 12),
                        Text(coworker.email),
                        // Add spacing here
                        Text(coworker.phone),
                      ],
                    ),
                  ],
                ),
                subtitle: Text(coworker.positionTitles.join(', ')), // Display all positions
              );
            },
          )
      ),
    );
  }
}
